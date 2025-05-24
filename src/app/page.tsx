import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Clock, MapPin, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import MenuCard from '@/components/sections/MenuCard';
import { SAMPLE_MENU, STORE_CONFIG } from '@/utils/constants';

export default function HomePage() {
  // Wybierz kilka produktów do wyświetlenia na stronie głównej
  const featuredProducts = SAMPLE_MENU.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&h=1080&fit=crop"
            alt="Bella Farina - Pizza i pieczywo"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-bg" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="heading-1 text-white mb-6 animate-fade-in">
            Witaj w Bella Farina
          </h1>
          <p className="text-large text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up">
            Tradycyjne smaki w nowoczesnym wydaniu. Najlepsza pizza, świeże pieczywo 
            i domowe ciasta w sercu Warszawy. Odkryj magię autentycznych smaków.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button size="lg" asChild>
              <Link href="/menu">
                Zobacz menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-gray-900" asChild>
              <Link href="/zamow">
                Zamów online
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Dlaczego Bella Farina?</h2>
            <p className="text-large max-w-2xl mx-auto">
              Łączymy tradycyjne receptury z najwyższą jakością składników
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 card-hover">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍕</span>
                </div>
                <h3 className="heading-4 mb-3">Świeża pizza</h3>
                <p className="text-body">
                  Ciasto przygotowywane codziennie, najlepsze składniki i tradycyjne metody pieczenia
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 card-hover">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥖</span>
                </div>
                <h3 className="heading-4 mb-3">Domowe pieczywo</h3>
                <p className="text-body">
                  Chleb na naturalnym zakwasie, bagietki i bułki pieczone każdego dnia
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 card-hover">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧁</span>
                </div>
                <h3 className="heading-4 mb-3">Autorskie ciasta</h3>
                <p className="text-body">
                  Desery według rodzinnych przepisów, przygotowywane z miłością i pasją
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Nasze specjalności</h2>
            <p className="text-large max-w-2xl mx-auto mb-8">
              Poznaj nasze najpopularniejsze produkty, które pokochali nasi klienci
            </p>
            <Button variant="outline" asChild>
              <Link href="/menu">
                Zobacz pełne menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <MenuCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Co mówią nasi klienci</h2>
            <p className="text-large max-w-2xl mx-auto">
              Opinie prawdziwych klientów, którzy pokochali nasze smaki
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Anna Kowalska",
                rating: 5,
                comment: "Najlepsza pizza w Warszawie! Ciasto idealne, składniki świeże. Polecam wszystkim!",
                date: "2 dni temu"
              },
              {
                name: "Piotr Nowak",
                rating: 5,
                comment: "Chleb na zakwasie to poezja. Kupuję tutaj codziennie, jakość zawsze na najwyższym poziomie.",
                date: "tydzień temu"
              },
              {
                name: "Maria Wiśniewska",
                rating: 5,
                comment: "Tiramisu jak we Włoszech! Obsługa miła, dostawa szybka. Będę wracać!",
                date: "2 tygodnie temu"
              }
            ].map((review, index) => (
              <Card key={index} className="p-6 card-hover">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-small">{review.date}</span>
                  </div>
                  <p className="text-body mb-4 italic">"{review.comment}"</p>
                  <p className="font-medium text-gray-900">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/opinie">
                Zobacz wszystkie opinie
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 text-white mb-6">Odwiedź nas</h2>
              <p className="text-large text-gray-300 mb-8">
                Zapraszamy do naszego przytulnego lokalu w centrum Warszawy. 
                Poczuj atmosferę prawdziwej włoskiej pizzerii.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span>{STORE_CONFIG.address.street}, {STORE_CONFIG.address.city}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span>{STORE_CONFIG.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span>Pon-Czw: 8:00-22:00, Pt-Sob: 8:00-23:00, Nd: 10:00-21:00</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link href="/lokal">
                    Więcej o lokalu
                  </Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900" asChild>
                  <Link href="/kontakt">
                    Skontaktuj się
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
                alt="Wnętrze restauracji Bella Farina"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="heading-2 text-white mb-4">Gotowy na zamówienie?</h2>
          <p className="text-large text-primary-100 mb-8 max-w-2xl mx-auto">
            Zamów online i odbierz w lokalu lub skorzystaj z dostawy. 
            Świeże smaki już za 15 minut!
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/zamow">
              Zamów teraz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}