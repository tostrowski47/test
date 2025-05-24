# 🔌 Przewodnik integracji - Bella Farina

Dokumentacja integracji z systemami zewnętrznymi: GOPos i Przelewy24.

## 🏪 Integracja z GOPos

GOPos to system POS (Point of Sale) używany w sklepie stacjonarnym. Integracja pozwala na:

### Funkcjonalności
- ✅ Synchronizacja menu i cen
- ✅ Zarządzanie stanami magazynowymi
- ✅ Wysyłanie zamówień online do systemu POS
- ✅ Wspólna baza klientów
- ✅ Raportowanie sprzedaży

### Konfiguracja

1. **Zmienne środowiskowe**
```env
GOPOS_API_URL=https://api.gopos.pl
GOPOS_API_KEY=your_gopos_api_key
GOPOS_STORE_ID=your_store_id
```

2. **Użycie w kodzie**
```typescript
import { goposAPI, syncMenuWithGOPos, sendOrderToGOPos } from '@/lib/gopos';

// Synchronizacja menu
const products = await syncMenuWithGOPos();

// Wysłanie zamówienia
const goposOrder = await sendOrderToGOPos({
  items: cartItems,
  customerInfo: customerData,
  orderType: 'online',
  totalAmount: totalPrice
});
```

### API Endpoints GOPos

| Endpoint | Metoda | Opis |
|----------|--------|------|
| `/api/v1/products` | GET | Lista produktów |
| `/api/v1/products/{id}/stock` | PUT | Aktualizacja stanu |
| `/api/v1/orders` | POST | Nowe zamówienie |
| `/api/v1/orders/{id}` | GET | Status zamówienia |
| `/api/v1/health` | GET | Test połączenia |

### Mapowanie kategorii

| GOPos | Aplikacja |
|-------|-----------|
| `pizza` | `pizza` |
| `bread`, `bakery` | `pieczywo` |
| `cakes`, `desserts` | `ciasta` |
| `drinks`, `beverages` | `napoje` |

## 💳 Integracja z Przelewy24

Przelewy24 to system płatności online obsługujący karty, BLIK, przelewy bankowe.

### Funkcjonalności
- ✅ Płatności kartą
- ✅ BLIK
- ✅ Przelewy bankowe
- ✅ Weryfikacja płatności
- ✅ Webhook dla statusów
- ✅ Tryb sandbox/produkcja

### Konfiguracja

1. **Zmienne środowiskowe**
```env
# Publiczne (frontend)
NEXT_PUBLIC_PRZELEWY24_MERCHANT_ID=your_merchant_id
NEXT_PUBLIC_PRZELEWY24_POS_ID=your_pos_id

# Prywatne (backend)
PRZELEWY24_CRC_KEY=your_crc_key
PRZELEWY24_API_KEY=your_api_key
```

2. **Użycie w kodzie**
```typescript
import { initializePayment, verifyPayment } from '@/lib/payments/przelewy24';

// Inicjalizacja płatności
const paymentResponse = await initializePayment({
  orderId: 'BF-123456',
  amount: 45.50,
  description: 'Zamówienie Bella Farina',
  customerInfo: {
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan@example.com'
  }
});

// Przekierowanie do płatności
window.location.href = paymentResponse.redirectUrl;
```

### Proces płatności

1. **Inicjalizacja** - `initializePayment()`
2. **Przekierowanie** - klient płaci na stronie Przelewy24
3. **Powrót** - przekierowanie na `/zamowienie/potwierdzenie`
4. **Webhook** - Przelewy24 wysyła status na `/api/payments/status`
5. **Weryfikacja** - `verifyPayment()` potwierdza płatność

### Statusy płatności

| Status | Opis |
|--------|------|
| `pending` | Oczekuje na płatność |
| `success` | Płatność zakończona sukcesem |
| `failed` | Płatność nieudana |
| `cancelled` | Płatność anulowana |

## 🔄 Przepływ zamówienia

### 1. Złożenie zamówienia
```typescript
// 1. Walidacja danych
const orderData = validateOrderForm(formData);

// 2. Generowanie ID zamówienia
const orderId = generateOrderId();

// 3. Wysłanie do GOPos (opcjonalne)
const goposOrder = await sendOrderToGOPos(orderData);

// 4. Inicjalizacja płatności (jeśli Przelewy24)
if (paymentMethod === 'przelewy24') {
  const payment = await initializePayment({
    orderId,
    amount: totalAmount,
    description: `Zamówienie ${orderId}`,
    customerInfo
  });
  
  // Przekierowanie do płatności
  window.location.href = payment.redirectUrl;
}
```

### 2. Potwierdzenie płatności
```typescript
// Webhook endpoint: /api/payments/status
export async function POST(request: NextRequest) {
  const { sessionId, amount } = await request.json();
  
  // Weryfikacja z Przelewy24
  const isVerified = await verifyPayment(sessionId, amount / 100);
  
  if (isVerified) {
    // Aktualizacja statusu zamówienia
    await updateOrderStatus(sessionId, 'paid');
    
    // Wysłanie email potwierdzenia
    await sendConfirmationEmail(sessionId);
    
    // Aktualizacja stanu w GOPos
    await updateGOPosOrderStatus(sessionId, 'confirmed');
  }
  
  return NextResponse.json({ status: 'OK' });
}
```

## 📧 System email

### Konfiguracja SMTP
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Szablony email
- **Potwierdzenie zamówienia** - po złożeniu
- **Płatność potwierdzona** - po udanej płatności
- **Zamówienie gotowe** - gdy można odbierać
- **Dostawa w drodze** - dla dostaw

## 🔧 Testowanie integracji

### GOPos
```typescript
// Test połączenia
const isConnected = await goposAPI.testConnection();
console.log('GOPos connected:', isConnected);

// Test synchronizacji
const products = await syncMenuWithGOPos();
console.log('Synced products:', products.length);
```

### Przelewy24
```typescript
// Test połączenia
const isConnected = await przelewy24API.testConnection();
console.log('Przelewy24 connected:', isConnected);

// Test płatności (sandbox)
const payment = await initializePayment({
  orderId: 'TEST-123',
  amount: 1.00,
  description: 'Test payment',
  customerInfo: testCustomer
});
```

## 🚨 Obsługa błędów

### Strategia Graceful Degradation
- Jeśli GOPos nie działa → używaj lokalnego menu
- Jeśli Przelewy24 nie działa → oferuj płatność przy odbiorze
- Zawsze loguj błędy do monitoringu

### Przykład
```typescript
try {
  const goposProducts = await syncMenuWithGOPos();
  setProducts(goposProducts);
} catch (error) {
  console.error('GOPos sync failed, using local menu:', error);
  setProducts(SAMPLE_MENU); // Fallback na lokalne menu
}
```

## 📊 Monitoring

### Metryki do śledzenia
- Czas odpowiedzi API GOPos
- Sukces/porażka synchronizacji
- Współczynnik udanych płatności
- Błędy integracji

### Logi
```typescript
// Strukturalne logowanie
console.log({
  event: 'order_created',
  orderId,
  amount: totalAmount,
  paymentMethod,
  goposSync: goposOrder ? 'success' : 'failed',
  timestamp: new Date().toISOString()
});
```

## 🔐 Bezpieczeństwo

### Najlepsze praktyki
- ✅ Nigdy nie eksponuj kluczy API w frontend
- ✅ Używaj HTTPS dla wszystkich połączeń
- ✅ Waliduj wszystkie dane wejściowe
- ✅ Implementuj rate limiting
- ✅ Loguj wszystkie transakcje

### Weryfikacja podpisów
```typescript
// Przelewy24 CRC verification
const crcString = `${posId}|${orderId}|${amount}|${currency}|${crcKey}`;
const expectedSign = crypto.createHash('md5').update(crcString).digest('hex');

if (receivedSign !== expectedSign) {
  throw new Error('Invalid signature');
}
```

---

**Uwaga**: To jest dokumentacja techniczna. Przed wdrożeniem na produkcję należy przeprowadzić pełne testy integracji w środowisku sandbox.