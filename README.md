# 🍕 Bella Farina - Strona internetowa pizzerii

Nowoczesna strona internetowa dla pizzerii, piekarni i ciastkarni "Bella Farina" zbudowana w Next.js 14 z TypeScript i Tailwind CSS.

## 📋 Funkcjonalności

### ✅ Zaimplementowane
- **Strona główna** - hero section, specjalności, opinie, kontakt
- **Menu** - pełne menu z filtrowaniem i wyszukiwaniem
- **System zamówień** - koszyk, formularz zamówienia, wybór dostawy/odbioru
- **O nas** - historia, zespół, wartości, filozofia
- **Lokal** - informacje o lokalu, galeria, udogodnienia
- **Opinie** - system opinii klientów z możliwością dodawania
- **Kontakt** - formularz kontaktowy, FAQ, mapa
- **Responsywny design** - mobile-first approach
- **Zarządzanie stanem** - Zustand dla koszyka
- **SEO** - optymalizacja meta tagów

### 🔄 Do implementacji
- **Backend Strapi** - CMS do zarządzania treściami
- **Integracja Przelewy24** - płatności online
- **Integracja GOPos** - synchronizacja z systemem POS
- **System email** - potwierdzenia zamówień
- **Panel administracyjny** - zarządzanie zamówieniami

## 🛠️ Stos technologiczny

### Frontend
- **Next.js 14** - React framework z App Router
- **TypeScript** - typowanie statyczne
- **Tailwind CSS** - utility-first CSS framework
- **Zustand** - zarządzanie stanem
- **React Hook Form** - obsługa formularzy
- **Lucide React** - ikony
- **Framer Motion** - animacje (gotowe do użycia)

### Planowany Backend
- **Strapi** - headless CMS
- **PostgreSQL** - baza danych
- **Przelewy24** - płatności online
- **GOPos API** - integracja z systemem POS

## 🚀 Instalacja i uruchomienie

### Wymagania
- Node.js 18+ 
- npm lub yarn

### Kroki instalacji

1. **Klonowanie repozytorium**
```bash
git clone <repository-url>
cd bella-farina-website
```

2. **Instalacja zależności**
```bash
npm install
# lub
yarn install
```

3. **Konfiguracja zmiennych środowiskowych**
```bash
cp .env.example .env.local
```

Edytuj `.env.local` i uzupełnij wymagane zmienne:
```env
# Strapi Backend URL
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Przelewy24 Configuration
NEXT_PUBLIC_PRZELEWY24_MERCHANT_ID=your_merchant_id
NEXT_PUBLIC_PRZELEWY24_POS_ID=your_pos_id
PRZELEWY24_CRC_KEY=your_crc_key

# GOPos Integration
GOPOS_API_URL=https://api.gopos.pl
GOPOS_API_KEY=your_gopos_api_key

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. **Uruchomienie w trybie deweloperskim**
```bash
npm run dev
# lub
yarn dev
```

Aplikacja będzie dostępna pod adresem: http://localhost:3000

## 📁 Struktura projektu

```
bella-farina-website/
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── globals.css        # Style globalne
│   │   ├── layout.tsx         # Layout główny
│   │   ├── page.tsx           # Strona główna
│   │   ├── menu/              # Strona menu
│   │   ├── zamow/             # Strona zamówień
│   │   ├── o-nas/             # Strona o nas
│   │   ├── lokal/             # Strona lokalu
│   │   ├── opinie/            # Strona opinii
│   │   └── kontakt/           # Strona kontaktu
│   ├── components/            # Komponenty React
│   │   ├── ui/                # Komponenty UI (Button, Input, Card)
│   │   ├── layout/            # Layout komponenty (Header, Footer)
│   │   └── sections/          # Sekcje strony (MenuCard, Cart)
│   ├── store/                 # Zarządzanie stanem (Zustand)
│   ├── types/                 # Definicje TypeScript
│   └── utils/                 # Funkcje pomocnicze i stałe
├── public/                    # Pliki statyczne
├── package.json              # Zależności projektu
├── tailwind.config.js        # Konfiguracja Tailwind
├── tsconfig.json             # Konfiguracja TypeScript
└── next.config.js            # Konfiguracja Next.js
```

## 🎨 Design System

### Kolory
- **Primary**: Odcienie brązu (#bfa094, #a18072, #977669)
- **Secondary**: Odcienie żółtego (#eab308, #ca8a04)
- **Accent**: Odcienie pomarańczowego (#f97316, #ea580c)

### Typografia
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Komponenty
- **Button** - różne warianty (primary, secondary, outline, ghost)
- **Input** - z obsługą błędów i helper text
- **Card** - elastyczne karty z header/content/footer
- **Badge** - etykiety statusów

## 📱 Responsywność

Aplikacja jest w pełni responsywna z podejściem mobile-first:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔧 Skrypty

```bash
# Uruchomienie w trybie deweloperskim
npm run dev

# Budowanie aplikacji produkcyjnej
npm run build

# Uruchomienie aplikacji produkcyjnej
npm run start

# Linting kodu
npm run lint

# Sprawdzanie typów TypeScript
npm run type-check
```

## 🚀 Deployment

### Vercel (Zalecane)
1. Połącz repozytorium z Vercel
2. Ustaw zmienne środowiskowe w panelu Vercel
3. Deploy automatycznie przy każdym push

### Inne platformy
- **Netlify** - podobnie jak Vercel
- **Railway** - dla full-stack z backend
- **DigitalOcean App Platform**

## 🔮 Roadmapa

### Faza 1 - Backend (W trakcie)
- [ ] Konfiguracja Strapi CMS
- [ ] Modele danych (produkty, zamówienia, opinie)
- [ ] API endpoints
- [ ] Panel administracyjny

### Faza 2 - Integracje
- [ ] Przelewy24 - płatności online
- [ ] GOPos - synchronizacja z systemem POS
- [ ] Email - potwierdzenia zamówień
- [ ] SMS - powiadomienia (opcjonalnie)

### Faza 3 - Rozszerzenia
- [ ] PWA - aplikacja mobilna
- [ ] Program lojalnościowy
- [ ] Subskrypcje wypieków
- [ ] Integracja social media

## 🤝 Współpraca

### Dodawanie nowych funkcji
1. Utwórz branch z opisową nazwą
2. Implementuj funkcję z testami
3. Utwórz Pull Request z opisem zmian

### Zgłaszanie błędów
Użyj GitHub Issues z szablonem:
- Opis problemu
- Kroki do reprodukcji
- Oczekiwane zachowanie
- Screenshots (jeśli dotyczy)

## 📄 Licencja

Projekt jest własnością Bella Farina. Wszystkie prawa zastrzeżone.

## 📞 Kontakt

- **Email**: kontakt@bellafarina.pl
- **Telefon**: +48 22 123 45 67
- **Adres**: Dobra 21, 00-344 Warszawa

---

**Bella Farina** - Gdzie tradycja spotyka się ze smakiem! 🍕🥖🧁