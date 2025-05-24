import React from 'react';
import Image from 'next/image';
import { MapPin, Clock, Phone, Wifi, Car, CreditCard, Users, Coffee } from 'lucide-react';
import { STORE_CONFIG } from '@/utils/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function LocationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop"
            alt="Wnętrze restauracji Bella Farina"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="heading-1 text-white mb-6">Zjedz na miejscu</h1>
          <p className="text-large text-white/90 max-w-2xl mx-auto">
            Odkryj przytulną atmosferę naszego lokalu w sercu Warszawy
          </p>
        </div>
      </section>

      {/* Informacje podstawowe */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informacje kontaktowe */}
            <div>
              <h2 className="heading-2 mb-8">Informacje praktyczne</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Adres</h3>
                        <p className="text-body">
                          {STORE_CONFIG.address.street}<br />
                          {STORE_CONFIG.address.postalCode} {STORE_CONFIG.address.city}
                        </p>
                        <p className="text-small mt-2 text-gray-500">
                          Śródmieście, blisko metra Centrum
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-3">Godziny otwarcia</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Poniedziałek - Czwartek</span>
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
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Kontakt</h3>
                        <p className="text-body">
                          Telefon: <a href={`tel:${STORE_CONFIG.phone}`} className="text-primary-600 hover:underline">{STORE_CONFIG.phone}</a>
                        </p>
                        <p className="text-body">
                          Email: <a href={`mailto:${STORE_CONFIG.email}`} className="text-primary-600 hover:underline">{STORE_CONFIG.email}</a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Mapa */}
            <div>
              <h2 className="heading-2 mb-8">Jak do nas dotrzeć</h2>
              <Card className="overflow-hidden">
                <div className="relative h-96">
                  {/* Placeholder dla mapy Google */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Mapa Google Maps<br />
                        {STORE_CONFIG.address.street}, {STORE_CONFIG.address.city}
                      </p>
                      <Button className="mt-4" asChild>
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
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600">
                    <p className="mb-2"><strong>Komunikacja publiczna:</strong></p>
                    <ul className="space-y-1">
                      <li>• Metro: Centrum (5 min pieszo)</li>
                      <li>• Autobusy: 160, 222, 503 (przystanek Marszałkowska)</li>
                      <li>• Tramwaje: 7, 9, 24 (przystanek Świętokrzyska)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Udogodnienia */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Udogodnienia</h2>
            <p className="text-large max-w-2xl mx-auto">
              Zadbaliśmy o Twój komfort podczas wizyty w naszym lokalu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Wifi className="h-8 w-8" />,
                title: "Darmowe WiFi",
                description: "Szybki internet dla wszystkich gości"
              },
              {
                icon: <Car className="h-8 w-8" />,
                title: "Parking",
                description: "Miejsca parkingowe w pobliżu"
              },
              {
                icon: <CreditCard className="h-8 w-8" />,
                title: "Płatności bezgotówkowe",
                description: "Karty, BLIK, Google Pay, Apple Pay"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Przyjazny dla rodzin",
                description: "Krzesełka dla dzieci, przewijak"
              },
              {
                icon: <Coffee className="h-8 w-8" />,
                title: "Kawa na wynos",
                description: "Świeża kawa w biodegradowalnych kubkach"
              },
              {
                icon: <span className="text-2xl">♿</span>,
                title: "Dostępność",
                description: "Lokal przystosowany dla osób niepełnosprawnych"
              },
              {
                icon: <span className="text-2xl">🌡️</span>,
                title: "Klimatyzacja",
                description: "Komfortowa temperatura przez cały rok"
              },
              {
                icon: <span className="text-2xl">🎵</span>,
                title: "Przyjemna muzyka",
                description: "Starannie dobrana playlista"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 card-hover">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria wnętrza */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Wnętrze lokalu</h2>
            <p className="text-large max-w-2xl mx-auto">
              Przytulna atmosfera, która sprawi, że poczujesz się jak w domu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
                alt: "Główna sala restauracji"
              },
              {
                src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
                alt: "Bar i otwarta kuchnia"
              },
              {
                src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
                alt: "Piec do pizzy"
              },
              {
                src: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&h=400&fit=crop",
                alt: "Przytulny kącik"
              },
              {
                src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
                alt: "Taras letni"
              },
              {
                src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
                alt: "Kuchnia w akcji"
              }
            ].map((image, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atmosfera */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 text-white mb-6">Atmosfera, która inspiruje</h2>
              <div className="space-y-4 text-primary-100">
                <p>
                  Nasz lokal to miejsce, gdzie tradycja spotyka się z nowoczesnością. 
                  Ciepłe, drewniane akcenty, otwarta kuchnia z autentycznym piecem 
                  do pizzy i starannie dobrane detale tworzą wyjątkową atmosferę.
                </p>
                <p>
                  Zaprojektowaliśmy przestrzeń tak, aby każdy gość czuł się komfortowo - 
                  czy to podczas romantycznej kolacji we dwoje, spotkania biznesowego, 
                  czy rodzinnego obiadu. Nasza otwarta kuchnia pozwala obserwować 
                  proces przygotowywania potraw, co dodaje autentyczności całemu doświadczeniu.
                </p>
                <p>
                  Latem zapraszamy na nasz przytulny taras, gdzie można delektować się 
                  smakami w otoczeniu zieleni, z dala od miejskiego zgiełku.
                </p>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop"
                alt="Przytulne wnętrze restauracji"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Informacje praktyczne */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Dobre wiedzieć</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Rezerwacje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body mb-4">
                  Nie przyjmujemy rezerwacji stolików. Obsługujemy gości w kolejności zgłoszeń.
                </p>
                <p className="text-small text-gray-500">
                  W godzinach szczytu (18:00-20:00) czas oczekiwania może wynosić 15-30 minut.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">🍕</span>
                  Czas oczekiwania
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body mb-4">
                  Pizza: 12-18 minut<br />
                  Pieczywo: 5-10 minut<br />
                  Ciasta: 3-5 minut<br />
                  Napoje: 2-3 minuty
                </p>
                <p className="text-small text-gray-500">
                  Czas może się wydłużyć w godzinach szczytu.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">🎂</span>
                  Eventy i uroczystości
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body mb-4">
                  Organizujemy małe eventy i przyjęcia urodzinowe. Skontaktuj się z nami, aby omówić szczegóły.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/kontakt">Zapytaj o event</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}