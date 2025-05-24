import { Product, StoreConfig } from '@/types';

// Przykładowe menu zgodne z wymaganiami
export const SAMPLE_MENU: Product[] = [
  // Pizza
  {
    id: 'pizza-1',
    name: 'Margherita',
    description: 'Sos pomidorowy, mozzarella, świeża bazylia',
    price: 32,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
    available: true,
    preparationTime: 15,
    ingredients: ['sos pomidorowy', 'mozzarella', 'bazylia'],
    allergens: ['gluten', 'mleko']
  },
  {
    id: 'pizza-2',
    name: 'Capricciosa',
    description: 'Sos pomidorowy, mozzarella, pieczarki, szynka',
    price: 38,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    available: true,
    preparationTime: 18,
    ingredients: ['sos pomidorowy', 'mozzarella', 'pieczarki', 'szynka'],
    allergens: ['gluten', 'mleko']
  },
  {
    id: 'pizza-3',
    name: 'Diavola',
    description: 'Sos pomidorowy, mozzarella, salami pikantne',
    price: 39,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    available: true,
    preparationTime: 16,
    ingredients: ['sos pomidorowy', 'mozzarella', 'salami pikantne'],
    allergens: ['gluten', 'mleko']
  },
  {
    id: 'pizza-4',
    name: 'Quattro Formaggi',
    description: 'Cztery rodzaje sera: mozzarella, gorgonzola, parmezan, ricotta',
    price: 42,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    available: true,
    preparationTime: 17,
    ingredients: ['mozzarella', 'gorgonzola', 'parmezan', 'ricotta'],
    allergens: ['gluten', 'mleko']
  },
  {
    id: 'pizza-5',
    name: 'Vegetariana',
    description: 'Sos pomidorowy, mozzarella, warzywa grillowane',
    price: 37,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400',
    available: true,
    preparationTime: 16,
    ingredients: ['sos pomidorowy', 'mozzarella', 'papryka', 'cukinia', 'bakłażan'],
    allergens: ['gluten', 'mleko']
  },

  // Pieczywo
  {
    id: 'bread-1',
    name: 'Chleb żytni na zakwasie',
    description: 'Tradycyjny chleb żytni na naturalnym zakwasie',
    price: 12,
    category: 'pieczywo',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    available: true,
    preparationTime: 5,
    ingredients: ['mąka żytnia', 'zakwas', 'sól', 'woda'],
    allergens: ['gluten']
  },
  {
    id: 'bread-2',
    name: 'Bagietka francuska',
    description: 'Chrupiąca bagietka w stylu francuskim',
    price: 8,
    category: 'pieczywo',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400',
    available: true,
    preparationTime: 3,
    ingredients: ['mąka pszenna', 'drożdże', 'sól', 'woda'],
    allergens: ['gluten']
  },
  {
    id: 'bread-3',
    name: 'Ciabatta',
    description: 'Włoski chleb o charakterystycznej strukturze',
    price: 7,
    category: 'pieczywo',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400',
    available: true,
    preparationTime: 3,
    ingredients: ['mąka pszenna', 'drożdże', 'oliwa', 'sól'],
    allergens: ['gluten']
  },
  {
    id: 'bread-4',
    name: 'Bułki pszenne (3 szt.)',
    description: 'Miękkie bułki pszenne, idealne na śniadanie',
    price: 5,
    category: 'pieczywo',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    available: true,
    preparationTime: 2,
    ingredients: ['mąka pszenna', 'mleko', 'drożdże', 'masło'],
    allergens: ['gluten', 'mleko']
  },
  {
    id: 'bread-5',
    name: 'Focaccia z rozmarynem',
    description: 'Aromatyczna focaccia z świeżym rozmarynem',
    price: 15,
    category: 'pieczywo',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400',
    available: true,
    preparationTime: 8,
    ingredients: ['mąka pszenna', 'oliwa', 'rozmaryn', 'sól morska'],
    allergens: ['gluten']
  },

  // Ciasta i desery
  {
    id: 'cake-1',
    name: 'Sernik wiedeński',
    description: 'Klasyczny sernik na kruchym spodzie',
    price: 12,
    category: 'ciasta',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
    available: true,
    preparationTime: 5,
    ingredients: ['twaróg', 'jajka', 'cukier', 'mąka'],
    allergens: ['gluten', 'mleko', 'jajka']
  },
  {
    id: 'cake-2',
    name: 'Szarlotka',
    description: 'Domowa szarlotka z cynamonem',
    price: 10,
    category: 'ciasta',
    image: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e9b5?w=400',
    available: true,
    preparationTime: 5,
    ingredients: ['jabłka', 'mąka', 'masło', 'cynamon'],
    allergens: ['gluten', 'mleko']
  },
  {
    id: 'cake-3',
    name: 'Tiramisu',
    description: 'Włoski deser z mascarpone i kawą',
    price: 15,
    category: 'ciasta',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    available: true,
    preparationTime: 3,
    ingredients: ['mascarpone', 'kawa', 'biszkopty', 'kakao'],
    allergens: ['mleko', 'jajka', 'gluten']
  },
  {
    id: 'cake-4',
    name: 'Brownie',
    description: 'Czekoladowe brownie z orzechami',
    price: 11,
    category: 'ciasta',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
    available: true,
    preparationTime: 3,
    ingredients: ['czekolada', 'masło', 'jajka', 'orzechy'],
    allergens: ['mleko', 'jajka', 'orzechy']
  },
  {
    id: 'cake-5',
    name: 'Croissant',
    description: 'Maślany croissant francuski',
    price: 7,
    category: 'ciasta',
    image: 'https://images.unsplash.com/photo-1555507036-ab794f4afe5e?w=400',
    available: true,
    preparationTime: 3,
    ingredients: ['mąka pszenna', 'masło', 'drożdże'],
    allergens: ['gluten', 'mleko']
  },

  // Napoje
  {
    id: 'drink-1',
    name: 'Kawa espresso',
    description: 'Klasyczne espresso z ziaren arabiki',
    price: 8,
    category: 'napoje',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400',
    available: true,
    preparationTime: 2,
    ingredients: ['kawa arabika'],
    allergens: []
  },
  {
    id: 'drink-2',
    name: 'Cappuccino',
    description: 'Espresso z delikatną pianką mleczną',
    price: 12,
    category: 'napoje',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
    available: true,
    preparationTime: 3,
    ingredients: ['kawa arabika', 'mleko'],
    allergens: ['mleko']
  },
  {
    id: 'drink-3',
    name: 'Herbata',
    description: 'Wybór herbat: czarna, zielona, owocowa',
    price: 8,
    category: 'napoje',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
    available: true,
    preparationTime: 3,
    ingredients: ['liście herbaty'],
    allergens: []
  },
  {
    id: 'drink-4',
    name: 'Lemoniada domowa',
    description: 'Świeża lemoniada z cytryną i miętą',
    price: 12,
    category: 'napoje',
    image: 'https://images.unsplash.com/photo-1523371683702-af5cd0cd9c65?w=400',
    available: true,
    preparationTime: 2,
    ingredients: ['cytryna', 'mięta', 'cukier', 'woda'],
    allergens: []
  },
  {
    id: 'drink-5',
    name: 'Sok świeży',
    description: 'Świeżo wyciskany sok pomarańczowy',
    price: 14,
    category: 'napoje',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
    available: true,
    preparationTime: 2,
    ingredients: ['pomarańcze'],
    allergens: []
  }
];

// Konfiguracja sklepu
export const STORE_CONFIG: StoreConfig = {
  name: 'Bella Farina',
  address: {
    street: 'Dobra 21',
    city: 'Warszawa',
    postalCode: '00-344'
  },
  phone: '+48 22 123 45 67',
  email: 'kontakt@bellafarina.pl',
  openingHours: {
    monday: { open: '08:00', close: '22:00' },
    tuesday: { open: '08:00', close: '22:00' },
    wednesday: { open: '08:00', close: '22:00' },
    thursday: { open: '08:00', close: '22:00' },
    friday: { open: '08:00', close: '23:00' },
    saturday: { open: '09:00', close: '23:00' },
    sunday: { open: '10:00', close: '21:00' }
  },
  deliveryZones: ['Śródmieście', 'Mokotów', 'Żoliborz', 'Praga Północ', 'Praga Południe'],
  minimumOrderAmount: 30,
  deliveryFee: 8
};

// Kategorie menu
export const MENU_CATEGORIES = [
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'pieczywo', name: 'Pieczywo', icon: '🥖' },
  { id: 'ciasta', name: 'Ciasta i Desery', icon: '🧁' },
  { id: 'napoje', name: 'Napoje', icon: '☕' }
] as const;