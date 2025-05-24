// Przelewy24 Integration Library
// Integracja z systemem płatności Przelewy24

interface Przelewy24Config {
  merchantId: string;
  posId: string;
  crcKey: string;
  apiKey: string;
  sandbox: boolean;
}

interface PaymentData {
  orderId: string;
  amount: number; // w groszach
  currency: string;
  description: string;
  email: string;
  country: string;
  language: string;
  urlReturn: string;
  urlStatus: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
}

interface PaymentResponse {
  token: string;
  redirectUrl: string;
}

class Przelewy24API {
  private config: Przelewy24Config;
  private baseUrl: string;

  constructor() {
    this.config = {
      merchantId: process.env.NEXT_PUBLIC_PRZELEWY24_MERCHANT_ID || '',
      posId: process.env.NEXT_PUBLIC_PRZELEWY24_POS_ID || '',
      crcKey: process.env.PRZELEWY24_CRC_KEY || '',
      apiKey: process.env.PRZELEWY24_API_KEY || '',
      sandbox: process.env.NODE_ENV !== 'production',
    };

    this.baseUrl = this.config.sandbox 
      ? 'https://sandbox.przelewy24.pl'
      : 'https://secure.przelewy24.pl';

    if (!this.config.merchantId || !this.config.posId) {
      console.warn('Przelewy24 credentials not configured');
    }
  }

  // Generowanie podpisu CRC
  private generateCRC(data: string): string {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(data).digest('hex');
  }

  // Przygotowanie danych płatności
  private preparePaymentData(paymentData: PaymentData): any {
    const {
      orderId,
      amount,
      currency,
      description,
      email,
      country,
      language,
      urlReturn,
      urlStatus,
      customerInfo
    } = paymentData;

    // Generowanie podpisu CRC
    const crcString = `${this.config.posId}|${orderId}|${amount}|${currency}|${this.config.crcKey}`;
    const sign = this.generateCRC(crcString);

    return {
      merchantId: this.config.merchantId,
      posId: this.config.posId,
      sessionId: orderId,
      amount,
      currency,
      description,
      email,
      country,
      language,
      urlReturn,
      urlStatus,
      sign,
      encoding: 'UTF-8',
      method: 0, // 0 = wszystkie dostępne metody
      p24_name: customerInfo.firstName,
      p24_surname: customerInfo.lastName,
      p24_email: customerInfo.email,
      p24_phone: customerInfo.phone || '',
    };
  }

  // Inicjalizacja płatności
  async initializePayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      const preparedData = this.preparePaymentData(paymentData);

      const response = await fetch(`${this.baseUrl}/api/v1/transaction/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${this.config.posId}:${this.config.apiKey}`).toString('base64')}`,
        },
        body: JSON.stringify(preparedData),
      });

      if (!response.ok) {
        throw new Error(`Przelewy24 API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(`Przelewy24 Error: ${result.error}`);
      }

      return {
        token: result.data.token,
        redirectUrl: `${this.baseUrl}/trnRequest/${result.data.token}`,
      };
    } catch (error) {
      console.error('Error initializing Przelewy24 payment:', error);
      throw error;
    }
  }

  // Weryfikacja płatności
  async verifyPayment(orderId: string, amount: number, currency: string = 'PLN'): Promise<boolean> {
    try {
      const crcString = `${this.config.posId}|${orderId}|${amount}|${currency}|${this.config.crcKey}`;
      const sign = this.generateCRC(crcString);

      const verificationData = {
        merchantId: this.config.merchantId,
        posId: this.config.posId,
        sessionId: orderId,
        amount,
        currency,
        sign,
      };

      const response = await fetch(`${this.baseUrl}/api/v1/transaction/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${this.config.posId}:${this.config.apiKey}`).toString('base64')}`,
        },
        body: JSON.stringify(verificationData),
      });

      if (!response.ok) {
        throw new Error(`Przelewy24 Verification Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result.data && result.data.status === 'success';
    } catch (error) {
      console.error('Error verifying Przelewy24 payment:', error);
      return false;
    }
  }

  // Sprawdzenie statusu płatności
  async getPaymentStatus(orderId: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/transaction/by/sessionId/${orderId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${this.config.posId}:${this.config.apiKey}`).toString('base64')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Przelewy24 Status Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result.data?.status || 'unknown';
    } catch (error) {
      console.error('Error getting payment status from Przelewy24:', error);
      return 'error';
    }
  }

  // Test połączenia
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/testAccess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${this.config.posId}:${this.config.apiKey}`).toString('base64')}`,
        },
        body: JSON.stringify({
          merchantId: this.config.merchantId,
          posId: this.config.posId,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Przelewy24 connection test failed:', error);
      return false;
    }
  }
}

// Singleton instance
export const przelewy24API = new Przelewy24API();

// Helper function do inicjalizacji płatności
export async function initializePayment(orderData: {
  orderId: string;
  amount: number;
  description: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
}): Promise<PaymentResponse> {
  const paymentData: PaymentData = {
    orderId: orderData.orderId,
    amount: Math.round(orderData.amount * 100), // Konwersja na grosze
    currency: 'PLN',
    description: orderData.description,
    email: orderData.customerInfo.email,
    country: 'PL',
    language: 'pl',
    urlReturn: `${process.env.NEXT_PUBLIC_SITE_URL}/zamowienie/potwierdzenie?orderId=${orderData.orderId}`,
    urlStatus: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/status`,
    customerInfo: orderData.customerInfo,
  };

  return await przelewy24API.initializePayment(paymentData);
}

// Helper function do weryfikacji płatności
export async function verifyPayment(orderId: string, amount: number): Promise<boolean> {
  return await przelewy24API.verifyPayment(orderId, Math.round(amount * 100));
}

// Helper function do sprawdzenia statusu
export async function getPaymentStatus(orderId: string): Promise<string> {
  return await przelewy24API.getPaymentStatus(orderId);
}