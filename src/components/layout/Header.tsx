'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, Phone, Clock } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { isStoreOpen } from '@/utils/helpers';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  // Obsługa scroll dla zmiany stylu header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { href: '/', label: 'Strona główna' },
    { href: '/o-nas', label: 'O nas' },
    { href: '/menu', label: 'Menu' },
    { href: '/zamow', label: 'Zamów online' },
    { href: '/lokal', label: 'Zjedz na miejscu' },
    { href: '/opinie', label: 'Opinie' },
    { href: '/kontakt', label: 'Kontakt' }
  ];

  const storeOpen = isStoreOpen();

  return (
    <>
      {/* Top bar z informacjami */}
      <div className="bg-primary-800 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>+48 22 123 45 67</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Dobra 21, Warszawa</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${storeOpen ? 'bg-green-400' : 'bg-red-400'}`} />
            <span>{storeOpen ? 'Otwarte' : 'Zamknięte'}</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md' 
          : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white font-bold text-lg">
                BF
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Bella Farina</h1>
                <p className="text-xs text-gray-500">Pizzeria • Piekarnia • Ciastkarnia</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Koszyk */}
              <Button
                variant="outline"
                size="sm"
                onClick={openCart}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Koszyk</span>
                {totalItems > 0 && (
                  <Badge
                    variant="error"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t bg-white py-4">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Status sklepu na mobile */}
                <div className="px-4 py-2 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${storeOpen ? 'bg-green-400' : 'bg-red-400'}`} />
                    <span className="text-gray-600">
                      Status: {storeOpen ? 'Otwarte' : 'Zamknięte'}
                    </span>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;