'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Star, ThumbsUp, MessageCircle, Filter, Search } from 'lucide-react';
import { Review } from '@/types';
import { formatDate } from '@/utils/helpers';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

// Przykładowe opinie
const SAMPLE_REVIEWS: Review[] = [
  {
    id: '1',
    customerName: 'Anna Kowalska',
    rating: 5,
    comment: 'Najlepsza pizza w Warszawie! Ciasto idealne, składniki świeże. Margherita smakowała jak prosto z Neapolu. Obsługa bardzo miła i profesjonalna. Na pewno wrócę!',
    date: new Date('2024-01-20'),
    verified: true
  },
  {
    id: '2',
    customerName: 'Piotr Nowak',
    rating: 5,
    comment: 'Chleb na zakwasie to poezja! Kupuję tutaj codziennie w drodze do pracy. Jakość zawsze na najwyższym poziomie, a ceny bardzo rozsądne. Polecam wszystkim!',
    date: new Date('2024-01-18'),
    verified: true
  },
  {
    id: '3',
    customerName: 'Maria Wiśniewska',
    rating: 5,
    comment: 'Tiramisu jak we Włoszech! Nie spodziewałam się tak autentycznego smaku w Warszawie. Obsługa miła, dostawa szybka. Będę wracać po więcej!',
    date: new Date('2024-01-15'),
    verified: false
  },
  {
    id: '4',
    customerName: 'Tomasz Kowalczyk',
    rating: 4,
    comment: 'Bardzo dobre jedzenie i przyjemna atmosfera. Pizza Diavola była wyśmienita, może tylko trochę za mało pikantna jak na mój gust. Lokal przytulny, obsługa sprawna.',
    date: new Date('2024-01-12'),
    verified: true
  },
  {
    id: '5',
    customerName: 'Katarzyna Zielińska',
    rating: 5,
    comment: 'Fantastyczne miejsce! Byłam tu z rodziną na obiedzie. Dzieci uwielbiały pizzę, a ja zakochałam się w sernik wiedeńskim. Czysto, smacznie, przystępnie.',
    date: new Date('2024-01-10'),
    verified: true
  },
  {
    id: '6',
    customerName: 'Michał Lewandowski',
    rating: 4,
    comment: 'Solidna pizzeria z dobrym jedzeniem. Cappuccino mogłoby być lepsze, ale pizza Quattro Formaggi była wyśmienita. Czas oczekiwania akceptowalny.',
    date: new Date('2024-01-08'),
    verified: false
  },
  {
    id: '7',
    customerName: 'Agnieszka Dąbrowska',
    rating: 5,
    comment: 'Zamówiłam catering na firmowe spotkanie. Wszystko było perfekcyjne - od komunikacji, przez punktualność, po jakość jedzenia. Wszyscy goście byli zachwyceni!',
    date: new Date('2024-01-05'),
    verified: true
  },
  {
    id: '8',
    customerName: 'Robert Jankowski',
    rating: 5,
    comment: 'Focaccia z rozmarynem to mistrzostwo! Chodzę tu regularnie na śniadanie. Kawa też bardzo dobra. Miła obsługa i przytulne wnętrze. Polecam!',
    date: new Date('2024-01-03'),
    verified: true
  }
];

interface ReviewFormData {
  customerName: string;
  email: string;
  rating: number;
  comment: string;
}

export default function ReviewsPage() {
  const [reviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ReviewFormData>();

  const selectedRating = watch('rating');

  // Obliczenia statystyk
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(review => review.rating === rating).length
  );

  // Filtrowanie opinii
  React.useEffect(() => {
    let filtered = reviews;

    if (filterRating !== 'all') {
      filtered = filtered.filter(review => review.rating === filterRating);
    }

    if (searchQuery) {
      filtered = filtered.filter(review =>
        review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredReviews(filtered);
  }, [filterRating, searchQuery, reviews]);

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    
    try {
      // Symulacja wysyłania opinii
      console.log('Nowa opinia:', data);
      
      // Tutaj będzie integracja z backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Dziękujemy za opinię! Po weryfikacji zostanie opublikowana.');
      reset();
      setShowForm(false);
      
    } catch (error) {
      console.error('Błąd podczas wysyłania opinii:', error);
      alert('Wystąpił błąd podczas wysyłania opinii. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container section-padding">
          <div className="text-center mb-12">
            <h1 className="heading-1 mb-4">Opinie klientów</h1>
            <p className="text-large max-w-2xl mx-auto">
              Poznaj opinie naszych gości i podziel się swoimi doświadczeniami
            </p>
          </div>

          {/* Statystyki */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-body">Średnia ocena</p>
                <p className="text-small text-gray-500">na podstawie {reviews.length} opinii</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-4 text-center">Rozkład ocen</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating, index) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <span className="text-sm w-3">{rating}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ 
                            width: `${reviews.length > 0 ? (ratingCounts[index] / reviews.length) * 100 : 0}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm w-8 text-right">{ratingCounts[index]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="font-semibold mb-2">Podziel się opinią</h3>
                <p className="text-body mb-4">Twoja opinia jest dla nas ważna</p>
                <Button onClick={() => setShowForm(true)}>
                  Dodaj opinię
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Filtry */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Wyszukiwanie */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Szukaj w opiniach..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtr ocen */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="all">Wszystkie oceny</option>
                  <option value={5}>5 gwiazdek</option>
                  <option value={4}>4 gwiazdki</option>
                  <option value={3}>3 gwiazdki</option>
                  <option value={2}>2 gwiazdki</option>
                  <option value={1}>1 gwiazdka</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista opinii */}
      <section className="section-padding">
        <div className="container">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="heading-3 mb-2">Nie znaleziono opinii</h3>
              <p className="text-body mb-6">
                Spróbuj zmienić kryteria wyszukiwania
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setFilterRating('all');
                }}
              >
                Wyczyść filtry
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold">
                            {review.customerName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{review.customerName}</h4>
                            {review.verified && (
                              <Badge variant="success" className="text-xs">
                                Zweryfikowana
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {renderStars(review.rating)}
                            <span className="text-small text-gray-500">
                              {formatDate(review.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-body leading-relaxed">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Formularz dodawania opinii */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Dodaj swoją opinię</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Imię i nazwisko"
                    {...register('customerName', { required: 'Imię i nazwisko są wymagane' })}
                    error={errors.customerName?.message}
                  />
                  <Input
                    label="Email"
                    type="email"
                    {...register('email', { 
                      required: 'Email jest wymagany',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Nieprawidłowy format email'
                      }
                    })}
                    error={errors.email?.message}
                    helperText="Email nie będzie publikowany"
                  />
                </div>

                <div>
                  <label className="form-label">Ocena *</label>
                  <div className="mt-2">
                    {renderStars(selectedRating || 0, true, (rating) => setValue('rating', rating))}
                  </div>
                  <input
                    type="hidden"
                    {...register('rating', { 
                      required: 'Ocena jest wymagana',
                      min: { value: 1, message: 'Minimalna ocena to 1' },
                      max: { value: 5, message: 'Maksymalna ocena to 5' }
                    })}
                  />
                  {errors.rating && (
                    <p className="form-error mt-1">{errors.rating.message}</p>
                  )}
                </div>

                <div>
                  <label className="form-label">Twoja opinia *</label>
                  <textarea
                    {...register('comment', { 
                      required: 'Opinia jest wymagana',
                      minLength: { value: 10, message: 'Opinia musi mieć co najmniej 10 znaków' }
                    })}
                    className="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    rows={4}
                    placeholder="Podziel się swoimi doświadczeniami..."
                  />
                  {errors.comment && (
                    <p className="form-error mt-1">{errors.comment.message}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Anuluj
                  </Button>
                  <Button type="submit" loading={isSubmitting}>
                    Wyślij opinię
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}