import React from 'react';
import Image from 'next/image';
import { Heart, Award, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop"
            alt="Zespół Bella Farina"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="heading-1 text-white mb-6">Nasza Historia</h1>
          <p className="text-large text-white/90 max-w-2xl mx-auto">
            Poznaj ludzi i pasję, która stoi za każdym smakiem w Bella Farina
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">Jak wszystko się zaczęło</h2>
              <div className="space-y-4 text-body">
                <p>
                  Bella Farina powstała z miłości do autentycznych smaków i tradycji kulinarnych. 
                  Naszą podróż rozpoczęliśmy w 2018 roku, kiedy to Marco Rossi, doświadczony 
                  pizzaiolo z Neapolu, postanowił podzielić się swoją pasją z mieszkańcami Warszawy.
                </p>
                <p>
                  Nazwa "Bella Farina" oznacza "piękna mąka" po włosku - to właśnie wysokiej 
                  jakości składniki są fundamentem naszej filozofii. Każdego dnia używamy 
                  tylko najlepszej mąki typu "00" importowanej bezpośrednio z Włoch, 
                  świeżych pomidorów San Marzano i prawdziwej mozzarelli di bufala.
                </p>
                <p>
                  Z czasem rozszerzyliśmy naszą ofertę o tradycyjne polskie pieczywo 
                  i autorskie ciasta, łącząc włoską tradycję z lokalnymi smakami. 
                  Dziś jesteśmy dumni, że możemy serwować naszym gościom to, co najlepsze 
                  z obu kultur kulinarnych.
                </p>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
                alt="Przygotowywanie pizzy"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wartości */}
      <section className="section-padding bg-primary-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Nasze wartości</h2>
            <p className="text-large max-w-2xl mx-auto">
              To, co nas wyróżnia i czym kierujemy się każdego dnia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 card-hover">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="heading-4 mb-3">Pasja</h3>
                <p className="text-body">
                  Każde danie przygotowujemy z miłością i zaangażowaniem
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 card-hover">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="heading-4 mb-3">Jakość</h3>
                <p className="text-body">
                  Tylko najlepsze składniki i sprawdzone receptury
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 card-hover">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="heading-4 mb-3">Społeczność</h3>
                <p className="text-body">
                  Budujemy relacje z naszymi gośćmi i lokalną społecznością
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 card-hover">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="heading-4 mb-3">Tradycja</h3>
                <p className="text-body">
                  Szanujemy tradycyjne metody i przekazujemy je dalej
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Zespół */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Nasz zespół</h2>
            <p className="text-large max-w-2xl mx-auto">
              Poznaj ludzi, którzy każdego dnia tworzą magię smaków w Bella Farina
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Marco Rossi",
                position: "Szef kuchni i właściciel",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                description: "Doświadczony pizzaiolo z Neapolu z 15-letnim stażem. Pasjonat tradycyjnej kuchni włoskiej."
              },
              {
                name: "Anna Kowalska",
                position: "Mistrz piekarnictwa",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
                description: "Absolwentka Akademii Kulinarnej, specjalistka od tradycyjnego polskiego pieczywa i ciast."
              },
              {
                name: "Tomasz Nowak",
                position: "Sous chef",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
                description: "Młody, utalentowany kucharz, który łączy nowoczesne techniki z tradycyjnymi smakami."
              }
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden card-hover">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="heading-4 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.position}</p>
                  <p className="text-body">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filozofia */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop"
                alt="Składniki do pizzy"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="heading-2 text-white mb-6">Nasza filozofia</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  W Bella Farina wierzymy, że jedzenie to nie tylko pożywienie - 
                  to sposób na łączenie ludzi, tworzenie wspomnień i celebrowanie życia. 
                  Każde danie, które opuszcza naszą kuchnię, niesie ze sobą cząstkę 
                  naszej pasji i szacunku do tradycji.
                </p>
                <p>
                  Współpracujemy wyłącznie z lokalnymi dostawcami, którzy dzielą 
                  nasze wartości dotyczące jakości i zrównoważonego rozwoju. 
                  Nasze mąki pochodzą z polskich młynów, warzywa od lokalnych 
                  rolników, a włoskie składniki importujemy bezpośrednio od 
                  sprawdzonych producentów.
                </p>
                <p>
                  Jesteśmy dumni z tego, że możemy być częścią warszawskiej 
                  społeczności i codziennie służyć naszym gościom nie tylko 
                  pysznym jedzeniem, ale także ciepłą atmosferą i autentycznym 
                  doświadczeniem kulinarnym.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nagrody i wyróżnienia */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Nagrody i wyróżnienia</h2>
            <p className="text-large max-w-2xl mx-auto">
              Jesteśmy dumni z uznania, jakie otrzymujemy od naszych gości i branży
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                year: "2023",
                title: "Najlepsza Pizza w Warszawie",
                organization: "Warsaw Food Awards",
                icon: "🏆"
              },
              {
                year: "2022",
                title: "Certyfikat Jakości",
                organization: "Stowarzyszenie Restauratorów",
                icon: "⭐"
              },
              {
                year: "2021",
                title: "Przyjazny Biznes",
                organization: "Urząd Dzielnicy Śródmieście",
                icon: "🤝"
              }
            ].map((award, index) => (
              <Card key={index} className="text-center p-6 card-hover">
                <CardContent className="p-0">
                  <div className="text-4xl mb-4">{award.icon}</div>
                  <div className="text-2xl font-bold text-primary-600 mb-2">{award.year}</div>
                  <h3 className="heading-4 mb-2">{award.title}</h3>
                  <p className="text-body">{award.organization}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}