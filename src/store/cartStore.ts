import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';
import { calculateCartTotal } from '@/utils/helpers';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, quantity?: number, notes?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Getters
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1, notes) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingItemIndex > -1) {
            // Jeśli produkt już istnieje, zwiększ ilość
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            if (notes) {
              updatedItems[existingItemIndex].notes = notes;
            }
            return { items: updatedItems };
          } else {
            // Dodaj nowy produkt
            return {
              items: [...state.items, { product, quantity, notes }]
            };
          }
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId)
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return calculateCartTotal(
          get().items.map((item) => ({
            price: item.product.price,
            quantity: item.quantity
          }))
        );
      },

      getItemQuantity: (productId: string) => {
        const item = get().items.find((item) => item.product.id === productId);
        return item ? item.quantity : 0;
      }
    }),
    {
      name: 'bella-farina-cart', // nazwa klucza w localStorage
      partialize: (state) => ({ items: state.items }), // zapisuj tylko items
    }
  )
);