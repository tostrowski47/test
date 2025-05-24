// Typy produktów
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  available: boolean;
  preparationTime: number; // w minutach
  ingredients?: string[];
  allergens?: string[];
}

export type ProductCategory = 'pizza' | 'pieczywo' | 'ciasta' | 'napoje';

// Typy zamówienia
export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
  estimatedDelivery?: Date;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'delivered' 
  | 'cancelled';

export type DeliveryType = 'pickup' | 'delivery';

// Informacje o kliencie
export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Informacje o dostawie
export interface DeliveryInfo {
  type: DeliveryType;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    apartment?: string;
  };
  deliveryTime: 'asap' | 'scheduled';
  scheduledTime?: Date;
  notes?: string;
}

// Informacje o płatności
export interface PaymentInfo {
  method: 'przelewy24' | 'cash' | 'card';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
}

// Opinie klientów
export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  date: Date;
  verified: boolean;
}

// Konfiguracja sklepu
export interface StoreConfig {
  name: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  phone: string;
  email: string;
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  deliveryZones: string[];
  minimumOrderAmount: number;
  deliveryFee: number;
}

// GOPos Integration
export interface GOPosProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  lastUpdated: Date;
}

export interface GOPosOrder {
  id: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  createdAt: Date;
}