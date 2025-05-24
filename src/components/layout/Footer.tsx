import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { STORE_CONFIG } from '@/utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Informacje o firmie */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white font-bold text-lg">
                BF
              </div>
              <div>
                <h3 className="text-lg font-bold">Bella Farina</h3>
                <p className="text-sm text-gray-400">Pizzeria • Piekarnia • Ciastkarnia</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tradycyjne smaki w nowoczesnym wydaniu. Świeże składniki, 
              domowe przepisy i pasja do gotowania - to nasza recepta na doskonałe jedzenie.
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  {STORE_CONFIG.address.street}, {STORE_CONFIG.address.city}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <a 
                  href={`tel:${STORE_CONFIG.phone}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {STORE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <a 
                  href={`mailto:${STORE_CONFIG.email}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {STORE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

          {/* Godziny otwarcia */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Godziny otwarcia
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Poniedziałek - Czwartek</span>
                <span className="text-white">08:00 - 22:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Piątek</span>
                <span className="text-white">08:00 - 23:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Sobota</span>
                <span className="text-white">09:00 - 23:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Niedziela</span>
                <span className="text-white">10:00 - 21:00</span>
              </div>
            </div>
          </div>

          {/* Linki i social media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Śledź nas</h4>
            <div className="space-y-3 mb-6">
              <Link 
                href="/menu" 
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Menu i cennik
              </Link>
              <Link 
                href="/zamow" 
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Zamów online
              </Link>
              <Link 
                href="/opinie" 
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Opinie klientów
              </Link>
              <Link 
                href="/kontakt" 
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Kontakt
              </Link>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} Bella Farina. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                href="/polityka-prywatnosci" 
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Polityka prywatności
              </Link>
              <Link 
                href="/regulamin" 
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Regulamin
              </Link>
              <Link 
                href="/cookies" 
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;