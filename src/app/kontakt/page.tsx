'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import { STORE_CONFIG } from '@/utils/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type: 'general' | 'catering' | 'complaint' | 'suggestion';
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    defaultValues: {
      type: 'general'
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Symulacja wysyłania wiadomości
      console.log('Wiadomość kontaktowa:', data);
      
      // Tutaj będzie integracja z backend API lub serwisem email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Dziękujemy za wiadomość! Odpowiemy w ciągu 24 godzin.');
      reset();
      
    } catch (error) {
      console.error('Błąd podczas wysyłania wiadomości:', error);
      alert('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container section-padding">
          <div className="text-center mb-12">
            <h1 className="heading-1 mb-4">Kontakt</h1>
            <p className="text-large max-w-2xl mx-auto">
              Masz pytania? Chcesz zamówić catering? A może po prostu chcesz się z nami skontaktować? 
              Jesteśmy tutaj dla Ciebie!
            </p>
          </div>
        </div>
      </section>

      {/* Główna sekcja kontaktu */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Informacje kontaktowe */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Adres
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body mb-4">
                    {STORE_CONFIG.address.street}<br />
                    {STORE_CONFIG.address.postalCode} {STORE_CONFIG.address.city}
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(`${STORE_CONFIG.address.street}, ${STORE_CONFIG.address.city}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Otwórz w mapach
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Telefon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body mb-2">
                    <a 
                      href={`tel:${STORE_CONFIG.phone}`}
                      className="text-primary-600 hover:underline font-medium"
                    >
                      {STORE_CONFIG.phone}
                    </a>
                  </p>
                  <p className="text-small text-gray-500">
                    Codziennie w godzinach otwarcia lokalu
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body mb-2">
                    <a 
                      href={`mailto:${STORE_CONFIG.email}`}
                      className="text-primary-600 hover:underline font-medium"
                    >
                      {STORE_CONFIG.email}
                    </a>
                  </p>
                  <p className="text-small text-gray-500">
                    Odpowiadamy w ciągu 24 godzin
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Godziny otwarcia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Pon - Czw</span>
                      <span className="font-medium">08:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Piątek</span>
                      <span className="font-medium">08:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sobota</span>
                      <span className="font-medium">09:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Niedziela</span>
                      <span className="font-medium">10:00 - 21:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Śledź nas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a 
                      href="#" 
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                  </div>
                  <p className="text-small text-gray-500 mt-3">
                    Najnowsze zdjęcia potraw i aktualności
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Formularz kontaktowy */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Wyślij wiadomość
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Typ zapytania */}
                    <div>
                      <label className="form-label">Typ zapytania</label>
                      <select
                        {...register('type')}
                        className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="general">Ogólne pytanie</option>
                        <option value="catering">Catering i eventy</option>
                        <option value="complaint">Reklamacja</option>
                        <option value="suggestion">Sugestia/pochwała</option>
                      </select>
                    </div>

                    {/* Dane kontaktowe */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Imię i nazwisko *"
                        {...register('name', { required: 'Imię i nazwisko są wymagane' })}
                        error={errors.name?.message}
                      />
                      <Input
                        label="Email *"
                        type="email"
                        {...register('email', { 
                          required: 'Email jest wymagany',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Nieprawidłowy format email'
                          }
                        })}
                        error={errors.email?.message}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Telefon (opcjonalnie)"
                        type="tel"
                        {...register('phone')}
                        placeholder="+48 123 456 789"
                      />
                      <Input
                        label="Temat *"
                        {...register('subject', { required: 'Temat jest wymagany' })}
                        error={errors.subject?.message}
                        placeholder="Krótko opisz temat"
                      />
                    </div>

                    {/* Wiadomość */}
                    <div>
                      <label className="form-label">Wiadomość *</label>
                      <textarea
                        {...register('message', { 
                          required: 'Wiadomość jest wymagana',
                          minLength: { value: 10, message: 'Wiadomość musi mieć co najmniej 10 znaków' }
                        })}
                        className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        rows={6}
                        placeholder="Opisz szczegółowo swoje pytanie lub prośbę..."
                      />
                      {errors.message && (
                        <p className="form-error mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Informacja o RODO */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-small text-gray-600">
                        Wysyłając formularz, wyrażasz zgodę na przetwarzanie Twoich danych osobowych 
                        w celu udzielenia odpowiedzi na zapytanie. Dane będą przetwarzane zgodnie z 
                        naszą <a href="/polityka-prywatnosci" className="text-primary-600 hover:underline">
                        polityką prywatności</a>.
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" loading={isSubmitting} size="lg">
                        <Send className="mr-2 h-4 w-4" />
                        Wyślij wiadomość
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Często zadawane pytania</h2>
            <p className="text-large max-w-2xl mx-auto">
              Sprawdź, czy znajdziesz odpowiedź na swoje pytanie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Czy przyjmujecie rezerwacje stolików?",
                answer: "Nie przyjmujemy rezerwacji. Obsługujemy gości w kolejności zgłoszeń. W godzinach szczytu może być konieczne krótkie oczekiwanie."
              },
              {
                question: "Czy oferujecie catering?",
                answer: "Tak! Oferujemy catering na eventy firmowe, prywatne uroczystości i spotkania. Skontaktuj się z nami, aby omówić szczegóły."
              },
              {
                question: "Jakie są koszty dostawy?",
                answer: "Dostawa kosztuje 8 zł. Dostarczamy zamówienia o wartości minimum 30 zł w obrębie dzielnic: Śródmieście, Mokotów, Żoliborz, Praga Północ i Południe."
              },
              {
                question: "Czy macie opcje wegańskie?",
                answer: "Tak, oferujemy pizzę z wegańskim serem oraz różne opcje wegańskie. Sprawdź nasze menu lub zapytaj obsługę o dostępne opcje."
              },
              {
                question: "Jak długo czeka się na zamówienie?",
                answer: "Pizza: 12-18 min, pieczywo: 5-10 min, ciasta: 3-5 min. W godzinach szczytu czas może się wydłużyć."
              },
              {
                question: "Czy można płacić kartą?",
                answer: "Tak, przyjmujemy płatności kartą, BLIK, Google Pay, Apple Pay oraz gotówkę. Online płatności przez Przelewy24."
              }
            ].map((faq, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 text-primary-700">{faq.question}</h3>
                  <p className="text-body">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="section-padding bg-gray-100">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Znajdź nas</h2>
            <p className="text-large">
              {STORE_CONFIG.address.street}, {STORE_CONFIG.address.city}
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="relative h-96">
              {/* Placeholder dla mapy Google */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Interaktywna mapa Google Maps<br />
                    {STORE_CONFIG.address.street}, {STORE_CONFIG.address.city}
                  </p>
                  <Button asChild>
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(`${STORE_CONFIG.address.street}, ${STORE_CONFIG.address.city}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Otwórz w Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Dojazd */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">🚇</div>
                <h3 className="font-semibold mb-2">Metro</h3>
                <p className="text-body">Centrum - 5 min pieszo</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">🚌</div>
                <h3 className="font-semibold mb-2">Autobus</h3>
                <p className="text-body">Linie 160, 222, 503</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">🚗</div>
                <h3 className="font-semibold mb-2">Samochód</h3>
                <p className="text-body">Parking w pobliżu</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}