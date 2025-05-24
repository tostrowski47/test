// GOPos Integration Library
// Integracja z systemem POS GOPos dla synchronizacji menu, stanów magazynowych i zamówień

import { GOPosProduct, GOPosOrder, Product } from '@/types';

const GOPOS_API_URL = process.env.GOPOS_API_URL || 'https://api.gopos.pl';
const GOPOS_API_KEY = process.env.GOPOS_API_KEY;
const GOPOS_STORE_ID = process.env.GOPOS_STORE_ID;

class GOPosAPI {
  private apiKey: string;
  private storeId: string;
  private baseUrl: string;

  constructor() {
    if (!GOPOS_API_KEY || !GOPOS_STORE_ID) {
      console.warn('GOPos API credentials not configured');
    }
    
    this.apiKey = GOPOS_API_KEY || '';
    this.storeId = GOPOS_STORE_ID || '';
    this.baseUrl = GOPOS_API_URL;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'X-Store-ID': this.storeId,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`GOPos API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Synchronizacja produktów z GOPos
  async syncProducts(): Promise<GOPosProduct[]> {
    try {
      const products = await this.makeRequest('/api/v1/products');
      return products;
    } catch (error) {
      console.error('Error syncing products from GOPos:', error);
      throw error;
    }
  }

  // Aktualizacja stanu magazynowego
  async updateStock(productId: string, quantity: number): Promise<void> {
    try {
      await this.makeRequest(`/api/v1/products/${productId}/stock`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
      });
    } catch (error) {
      console.error('Error updating stock in GOPos:', error);
      throw error;
    }
  }

  // Wysłanie zamówienia do GOPos
  async createOrder(orderData: {
    items: Array<{ productId: string; quantity: number; price: number }>;
    customerInfo: {
      name: string;
      email: string;
      phone: string;
    };
    orderType: 'online' | 'pickup' | 'delivery';
    totalAmount: number;
  }): Promise<GOPosOrder> {
    try {
      const order = await this.makeRequest('/api/v1/orders', {
        method: 'POST',
        body: JSON.stringify({
          ...orderData,
          source: 'website',
          storeId: this.storeId,
        }),
      });
      return order;
    } catch (error) {
      console.error('Error creating order in GOPos:', error);
      throw error;
    }
  }

  // Pobranie statusu zamówienia
  async getOrderStatus(orderId: string): Promise<string> {
    try {
      const order = await this.makeRequest(`/api/v1/orders/${orderId}`);
      return order.status;
    } catch (error) {
      console.error('Error getting order status from GOPos:', error);
      throw error;
    }
  }

  // Mapowanie produktów z GOPos na format aplikacji
  mapGOPosProductToProduct(goposProduct: GOPosProduct): Product {
    return {
      id: goposProduct.id,
      name: goposProduct.name,
      price: goposProduct.price,
      category: this.mapGOPosCategoryToAppCategory(goposProduct.category),
      description: `Produkt z systemu POS`, // GOPos może nie mieć opisów
      image: '/placeholder-product.jpg', // Domyślny obrazek
      available: goposProduct.stock > 0,
      preparationTime: 15, // Domyślny czas
      ingredients: [],
      allergens: [],
    };
  }

  private mapGOPosCategoryToAppCategory(goposCategory: string): 'pizza' | 'pieczywo' | 'ciasta' | 'napoje' {
    const categoryMap: Record<string, 'pizza' | 'pieczywo' | 'ciasta' | 'napoje'> = {
      'pizza': 'pizza',
      'bread': 'pieczywo',
      'bakery': 'pieczywo',
      'cakes': 'ciasta',
      'desserts': 'ciasta',
      'drinks': 'napoje',
      'beverages': 'napoje',
    };

    return categoryMap[goposCategory.toLowerCase()] || 'pizza';
  }

  // Sprawdzenie połączenia z GOPos
  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('/api/v1/health');
      return true;
    } catch (error) {
      console.error('GOPos connection test failed:', error);
      return false;
    }
  }
}

// Singleton instance
export const goposAPI = new GOPosAPI();

// Hook do synchronizacji produktów
export async function syncMenuWithGOPos(): Promise<Product[]> {
  try {
    const goposProducts = await goposAPI.syncProducts();
    return goposProducts.map(product => goposAPI.mapGOPosProductToProduct(product));
  } catch (error) {
    console.error('Failed to sync menu with GOPos:', error);
    // Zwróć pustą tablicę w przypadku błędu - aplikacja będzie używać lokalnego menu
    return [];
  }
}

// Hook do wysyłania zamówienia do GOPos
export async function sendOrderToGOPos(orderData: any): Promise<GOPosOrder | null> {
  try {
    return await goposAPI.createOrder(orderData);
  } catch (error) {
    console.error('Failed to send order to GOPos:', error);
    // Nie blokuj procesu zamówienia jeśli GOPos nie działa
    return null;
  }
}