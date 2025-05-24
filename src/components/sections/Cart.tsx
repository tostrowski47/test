'use client';

import React from 'react';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/utils/helpers';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const Cart: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={closeCart}
      />

      {/* Koszyk - sidebar */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl transition-transform">
        <div className="flex h-full flex-col">
          {/* Header */}
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Koszyk ({totalItems})
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeCart}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Zawartość koszyka */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <ShoppingCart className="mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Koszyk jest pusty
                </h3>
                <p className="text-sm text-gray-500">
                  Dodaj produkty z menu, aby rozpocząć zamówienie
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <Card key={item.product.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        {/* Zdjęcie produktu */}
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Informacje o produkcie */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {formatPrice(item.product.price)}
                          </p>
                          
                          {/* Notatki */}
                          {item.notes && (
                            <p className="mt-1 text-xs text-gray-400 italic">
                              {item.notes}
                            </p>
                          )}

                          {/* Kontrolki ilości */}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-6 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.product.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Cena całkowita za pozycję */}
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer z podsumowaniem */}
          {items.length > 0 && (
            <div className="border-t bg-gray-50 p-4 space-y-4">
              {/* Podsumowanie */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Produkty ({totalItems})</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Dostawa</span>
                  <span className="text-green-600">Obliczana przy zamówieniu</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Razem</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Przyciski akcji */}
              <div className="space-y-2">
                <Button
                  className="w-full"
                  onClick={() => {
                    closeCart();
                    // Przekierowanie do strony zamówienia
                    window.location.href = '/zamow';
                  }}
                >
                  Przejdź do zamówienia
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Wyczyść koszyk
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;