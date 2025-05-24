import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility do łączenia klas Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatowanie ceny
export function formatPrice(price: number): string {
  return `${price.toFixed(2)} zł`;
}

// Formatowanie czasu przygotowania
export function formatPreparationTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 
    ? `${hours}h ${remainingMinutes}min` 
    : `${hours}h`;
}

// Walidacja email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Walidacja numeru telefonu (polski format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+48\s?)?(\d{3}\s?\d{3}\s?\d{3}|\d{2}\s?\d{3}\s?\d{2}\s?\d{2})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Formatowanie numeru telefonu
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('48')) {
    const number = cleaned.slice(2);
    return `+48 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
  }
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
}

// Obliczanie całkowitej wartości koszyka
export function calculateCartTotal(items: Array<{ price: number; quantity: number }>): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Generowanie ID zamówienia
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `BF-${timestamp}-${randomStr}`.toUpperCase();
}

// Formatowanie daty
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Sprawdzanie czy sklep jest otwarty
export function isStoreOpen(): boolean {
  const now = new Date();
  const day = now.toLocaleLowerCase().substring(0, 3); // mon, tue, etc.
  const currentTime = now.getHours() * 100 + now.getMinutes(); // HHMM format
  
  // Przykładowe godziny otwarcia - można to przenieść do konfiguracji
  const hours: Record<string, { open: number; close: number }> = {
    mon: { open: 800, close: 2200 },
    tue: { open: 800, close: 2200 },
    wed: { open: 800, close: 2200 },
    thu: { open: 800, close: 2200 },
    fri: { open: 800, close: 2300 },
    sat: { open: 900, close: 2300 },
    sun: { open: 1000, close: 2100 }
  };

  const todayHours = hours[day];
  if (!todayHours) return false;

  return currentTime >= todayHours.open && currentTime <= todayHours.close;
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Scroll to element
export function scrollToElement(elementId: string, offset: number = 80): void {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}