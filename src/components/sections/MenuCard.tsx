'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, Clock, AlertCircle } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, formatPreparationTime } from '@/utils/helpers';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface MenuCardProps {
  product: Product;
}

const MenuCard: React.FC<MenuCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  
  const { addItem, getItemQuantity } = useCartStore();
  const cartQuantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, notes || undefined);
    setQuantity(1);
    setNotes('');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay z informacjami */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Badge dostępności */}
        {!product.available && (
          <div className="absolute top-2 right-2">
            <Badge variant="error" className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Niedostępne
            </Badge>
          </div>
        )}

        {/* Czas przygotowania */}
        <div className="absolute top-2 left-2">
          <Badge variant="default" className="flex items-center gap-1 bg-white/90 text-gray-800">
            <Clock className="h-3 w-3" />
            {formatPreparationTime(product.preparationTime)}
          </Badge>
        </div>

        {/* Ilość w koszyku */}
        {cartQuantity > 0 && (
          <div className="absolute bottom-2 right-2">
            <Badge variant="success" className="font-semibold">
              W koszyku: {cartQuantity}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
            {product.name}
          </h3>
          <span className="text-xl font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Przycisk szczegółów */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mb-3 text-xs text-primary-600 hover:text-primary-700 transition-colors"
        >
          {showDetails ? 'Ukryj szczegóły' : 'Pokaż składniki i alergeny'}
        </button>

        {/* Szczegóły produktu */}
        {showDetails && (
          <div className="mb-4 space-y-2 rounded-lg bg-gray-50 p-3 text-xs">
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <span className="font-medium text-gray-700">Składniki: </span>
                <span className="text-gray-600">{product.ingredients.join(', ')}</span>
              </div>
            )}
            {product.allergens && product.allergens.length > 0 && (
              <div>
                <span className="font-medium text-gray-700">Alergeny: </span>
                <span className="text-gray-600">{product.allergens.join(', ')}</span>
              </div>
            )}
          </div>
        )}

        {/* Kontrolki ilości i dodawania do koszyka */}
        {product.available && (
          <div className="space-y-3">
            {/* Notatki */}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Dodatkowe uwagi (opcjonalnie)"
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              rows={2}
            />

            {/* Kontrolki ilości */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={incrementQuantity}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex items-center gap-2"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                Dodaj do koszyka
              </Button>
            </div>
          </div>
        )}

        {!product.available && (
          <div className="text-center">
            <Badge variant="error" className="w-full justify-center py-2">
              Produkt obecnie niedostępny
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuCard;