'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { ProductCategory } from '@/types';
import { SAMPLE_MENU, MENU_CATEGORIES } from '@/utils/constants';
import MenuCard from '@/components/sections/MenuCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'category'>('category');

  // Filtrowanie i sortowanie produktów
  const filteredProducts = useMemo(() => {
    let products = SAMPLE_MENU;

    // Filtrowanie po kategorii
    if (selectedCategory !== 'all') {
      products = products.filter(product => product.category === selectedCategory);
    }

    // Filtrowanie po wyszukiwanej frazie
    if (searchQuery) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.ingredients?.some(ingredient => 
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Sortowanie
    products.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return products;
  }, [selectedCategory, searchQuery, sortBy]);

  // Grupowanie produktów po kategorii dla lepszego wyświetlania
  const groupedProducts = useMemo(() => {
    if (selectedCategory !== 'all') {
      return { [selectedCategory]: filteredProducts };
    }

    return filteredProducts.reduce((groups, product) => {
      const category = product.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(product);
      return groups;
    }, {} as Record<ProductCategory, typeof filteredProducts>);
  }, [filteredProducts, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container section-padding">
          <div className="text-center mb-12">
            <h1 className="heading-1 mb-4">Nasze Menu</h1>
            <p className="text-large max-w-2xl mx-auto">
              Odkryj bogactwo smaków - od tradycyjnej pizzy po domowe ciasta. 
              Wszystkie produkty przygotowywane są ze świeżych składników.
            </p>
          </div>

          {/* Filtry i wyszukiwanie */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-6">
            {/* Wyszukiwanie */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Szukaj produktów, składników..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Kategorie */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                Wszystkie
              </Button>
              {MENU_CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id as ProductCategory)}
                  className="flex items-center gap-2"
                >
                  <span>{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Sortowanie */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Sortuj według:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'category')}
                className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="category">Kategorii</option>
                <option value="name">Nazwy</option>
                <option value="price">Ceny</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Produkty */}
      <section className="section-padding">
        <div className="container">
          {/* Informacja o wynikach */}
          <div className="mb-8 text-center">
            <p className="text-body">
              Znaleziono <span className="font-semibold">{filteredProducts.length}</span> produktów
              {searchQuery && (
                <span> dla zapytania "<span className="font-semibold">{searchQuery}</span>"</span>
              )}
            </p>
          </div>

          {/* Lista produktów */}
          {Object.keys(groupedProducts).length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="heading-3 mb-2">Nie znaleziono produktów</h3>
              <p className="text-body mb-6">
                Spróbuj zmienić kryteria wyszukiwania lub wybierz inną kategorię
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Wyczyść filtry
              </Button>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(groupedProducts).map(([category, products]) => {
                const categoryInfo = MENU_CATEGORIES.find(cat => cat.id === category);
                
                return (
                  <div key={category}>
                    {/* Nagłówek kategorii (tylko gdy wyświetlamy wszystkie kategorie) */}
                    {selectedCategory === 'all' && (
                      <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <span className="text-4xl">{categoryInfo?.icon}</span>
                          <h2 className="heading-2">{categoryInfo?.name}</h2>
                        </div>
                        <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full" />
                      </div>
                    )}

                    {/* Siatka produktów */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {products.map((product) => (
                        <MenuCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Informacje dodatkowe */}
      <section className="bg-primary-50 section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-4">⏱️</div>
              <h3 className="heading-4 mb-2">Szybka realizacja</h3>
              <p className="text-body">
                Większość zamówień gotowa w 15-20 minut
              </p>
            </div>
            <div>
              <div className="text-3xl mb-4">🌱</div>
              <h3 className="heading-4 mb-2">Świeże składniki</h3>
              <p className="text-body">
                Codziennie świeże dostawy od lokalnych dostawców
              </p>
            </div>
            <div>
              <div className="text-3xl mb-4">👨‍🍳</div>
              <h3 className="heading-4 mb-2">Doświadczeni kucharze</h3>
              <p className="text-body">
                Nasz zespół ma wieloletnie doświadczenie
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}