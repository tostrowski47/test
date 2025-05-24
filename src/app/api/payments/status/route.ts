import { NextRequest, NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/payments/przelewy24';

// Webhook endpoint dla Przelewy24 do otrzymywania statusów płatności
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Przelewy24 wysyła dane w formacie:
    // {
    //   merchantId: string,
    //   posId: string,
    //   sessionId: string, // orderId
    //   amount: number,
    //   currency: string,
    //   orderId: number,
    //   methodId: number,
    //   statement: string,
    //   sign: string
    // }

    const { sessionId, amount, currency, sign } = body;

    if (!sessionId || !amount) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Weryfikacja płatności z Przelewy24
    const isVerified = await verifyPayment(sessionId, amount / 100); // Konwersja z groszy na złote

    if (isVerified) {
      // Tutaj można dodać logikę aktualizacji statusu zamówienia w bazie danych
      console.log(`Payment verified for order: ${sessionId}`);
      
      // Przykład aktualizacji zamówienia:
      // await updateOrderStatus(sessionId, 'paid');
      // await sendConfirmationEmail(sessionId);
      
      return NextResponse.json({ status: 'OK' });
    } else {
      console.error(`Payment verification failed for order: ${sessionId}`);
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error processing payment status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint do sprawdzania statusu płatności
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Tutaj można dodać logikę sprawdzenia statusu w bazie danych
    // const orderStatus = await getOrderStatus(orderId);
    
    return NextResponse.json({
      orderId,
      status: 'pending', // Przykładowy status
      message: 'Payment status check endpoint'
    });
  } catch (error) {
    console.error('Error checking payment status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}