'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Clock, CreditCard, Truck, Store, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { CustomerInfo, DeliveryInfo, DeliveryType } from '@/types';
import { formatPrice, generateOrderId } from '@/utils/helpers';
import { STORE_CONFIG } from '@/utils/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface OrderFormData extends CustomerInfo {
  deliveryType: DeliveryType;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    apartment?: string;
  };
  deliveryTime: 'asap' | 'scheduled';
  scheduledTime?: string;
  notes?: string;
  paymentMethod: 'przelewy24' | 'cash' | 'card';
}

export default function OrderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { items, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const deliveryFee = STORE_CONFIG.deliveryFee;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues
  } = useForm<OrderFormData>({
    defaultValues: {
      deliveryType: 'pickup',
      deliveryTime: 'asap',
      paymentMethod: 'przelewy24'
    }
  });

  const deliveryType = watch('deliveryType');
  const deliveryTime = watch('deliveryTime');
  const paymentMethod = watch('paymentMethod');

  // Sprawdź czy koszyk jest pusty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="heading-2 mb-4">Koszyk jest pusty</h1>
          <p className="text-body mb-8">
            Dodaj produkty do koszyka, aby móc złożyć zamówienie
          </p>
          <Button asChild>
            <a href="/menu">Przejdź do menu</a>
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    
    try {
      // Symulacja wysyłania zamówienia
      const orderId = generateOrderId();
      
      // Tutaj będzie integracja z backend API
      console.log('Zamówienie:', {
        id: orderId,
        items,
        customerInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone
        },
        deliveryInfo: {
          type: data.deliveryType,
          address: data.address,
          deliveryTime: data.deliveryTime,
          scheduledTime: data.scheduledTime,
          notes: data.notes
        },
        paymentInfo: {
          method: data.paymentMethod,
          status: 'pending'
        },
        totalAmount: deliveryType === 'delivery' ? totalPrice + deliveryFee : totalPrice
      });

      // Przekierowanie do płatności lub potwierdzenia
      if (data.paymentMethod === 'przelewy24') {
        // Tutaj będzie integracja z Przelewy24
        alert(`Zamówienie ${orderId} zostało złożone! Przekierowanie do płatności...`);
      } else {
        alert(`Zamówienie ${orderId} zostało złożone! Dziękujemy!`);
      }

      clearCart();
      
    } catch (error) {
      console.error('Błąd podczas składania zamówienia:', error);
      alert('Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const calculateTotal = () => {
    return deliveryType === 'delivery' ? totalPrice + deliveryFee : totalPrice;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Krok {currentStep} z 3: {
                  currentStep === 1 ? 'Dostawa' :
                  currentStep === 2 ? 'Dane kontaktowe' :
                  'Podsumowanie i płatność'
                }
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formularz */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Krok 1: Typ dostawy */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Wybierz sposób odbioru
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Typ dostawy */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                        deliveryType === 'pickup' 
                          ? 'border-primary-600 bg-primary-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <input
                          type="radio"
                          value="pickup"
                          {...register('deliveryType')}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <Store className="h-6 w-6 text-primary-600" />
                          <div>
                            <h3 className="font-medium">Odbiór osobisty</h3>
                            <p className="text-sm text-gray-600">Bezpłatnie</p>
                          </div>
                        </div>
                      </label>

                      <label className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                        deliveryType === 'delivery' 
                          ? 'border-primary-600 bg-primary-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <input
                          type="radio"
                          value="delivery"
                          {...register('deliveryType')}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <Truck className="h-6 w-6 text-primary-600" />
                          <div>
                            <h3 className="font-medium">Dostawa</h3>
                            <p className="text-sm text-gray-600">{formatPrice(deliveryFee)}</p>
                          </div>
                        </div>
                      </label>
                    </div>

                    {/* Adres dostawy */}
                    {deliveryType === 'delivery' && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Adres dostawy
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Ulica i numer"
                            {...register('address.street', { 
                              required: deliveryType === 'delivery' ? 'Ulica jest wymagana' : false 
                            })}
                            error={errors.address?.street?.message}
                          />
                          <Input
                            label="Mieszkanie/lokal (opcjonalnie)"
                            {...register('address.apartment')}
                          />
                          <Input
                            label="Miasto"
                            {...register('address.city', { 
                              required: deliveryType === 'delivery' ? 'Miasto jest wymagane' : false 
                            })}
                            error={errors.address?.city?.message}
                          />
                          <Input
                            label="Kod pocztowy"
                            {...register('address.postalCode', { 
                              required: deliveryType === 'delivery' ? 'Kod pocztowy jest wymagany' : false,
                              pattern: {
                                value: /^\d{2}-\d{3}$/,
                                message: 'Nieprawidłowy format kodu pocztowego (XX-XXX)'
                              }
                            })}
                            error={errors.address?.postalCode?.message}
                            placeholder="00-000"
                          />
                        </div>
                      </div>
                    )}

                    {/* Czas dostawy */}
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Czas {deliveryType === 'delivery' ? 'dostawy' : 'odbioru'}
                      </h4>
                      
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            value="asap"
                            {...register('deliveryTime')}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <span>Jak najszybciej (15-30 min)</span>
                        </label>
                        
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            value="scheduled"
                            {...register('deliveryTime')}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <span>Zaplanuj czas</span>
                        </label>
                      </div>

                      {deliveryTime === 'scheduled' && (
                        <Input
                          type="datetime-local"
                          label="Wybierz czas"
                          {...register('scheduledTime', {
                            required: deliveryTime === 'scheduled' ? 'Wybierz czas' : false
                          })}
                          error={errors.scheduledTime?.message}
                          min={new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16)}
                        />
                      )}
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={nextStep} type="button">
                        Dalej
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Krok 2: Dane kontaktowe */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Dane kontaktowe</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Imię"
                        {...register('firstName', { required: 'Imię jest wymagane' })}
                        error={errors.firstName?.message}
                      />
                      <Input
                        label="Nazwisko"
                        {...register('lastName', { required: 'Nazwisko jest wymagane' })}
                        error={errors.lastName?.message}
                      />
                    </div>
                    
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
                    />
                    
                    <Input
                      label="Telefon"
                      type="tel"
                      {...register('phone', { 
                        required: 'Telefon jest wymagany',
                        pattern: {
                          value: /^(\+48\s?)?(\d{3}\s?\d{3}\s?\d{3}|\d{2}\s?\d{3}\s?\d{2}\s?\d{2})$/,
                          message: 'Nieprawidłowy format telefonu'
                        }
                      })}
                      error={errors.phone?.message}
                      placeholder="+48 123 456 789"
                    />

                    <div>
                      <label className="form-label">Uwagi do zamówienia (opcjonalnie)</label>
                      <textarea
                        {...register('notes')}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        rows={3}
                        placeholder="Dodatkowe informacje, preferencje..."
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep} type="button">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Wstecz
                      </Button>
                      <Button onClick={nextStep} type="button">
                        Dalej
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Krok 3: Płatność */}
              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Sposób płatności
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <label className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                        paymentMethod === 'przelewy24' 
                          ? 'border-primary-600 bg-primary-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <input
                          type="radio"
                          value="przelewy24"
                          {...register('paymentMethod')}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="h-6 w-6 text-primary-600" />
                            <div>
                              <h3 className="font-medium">Przelewy24</h3>
                              <p className="text-sm text-gray-600">Płatność online</p>
                            </div>
                          </div>
                          <Badge variant="success">Polecane</Badge>
                        </div>
                      </label>

                      {deliveryType === 'pickup' && (
                        <>
                          <label className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                            paymentMethod === 'cash' 
                              ? 'border-primary-600 bg-primary-50' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}>
                            <input
                              type="radio"
                              value="cash"
                              {...register('paymentMethod')}
                              className="sr-only"
                            />
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">💵</span>
                              <div>
                                <h3 className="font-medium">Gotówka przy odbiorze</h3>
                                <p className="text-sm text-gray-600">Tylko odbiór osobisty</p>
                              </div>
                            </div>
                          </label>

                          <label className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                            paymentMethod === 'card' 
                              ? 'border-primary-600 bg-primary-50' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}>
                            <input
                              type="radio"
                              value="card"
                              {...register('paymentMethod')}
                              className="sr-only"
                            />
                            <div className="flex items-center space-x-3">
                              <CreditCard className="h-6 w-6 text-primary-600" />
                              <div>
                                <h3 className="font-medium">Karta przy odbiorze</h3>
                                <p className="text-sm text-gray-600">Terminal płatniczy</p>
                              </div>
                            </div>
                          </label>
                        </>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep} type="button">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Wstecz
                      </Button>
                      <Button type="submit" loading={isSubmitting} size="lg">
                        {paymentMethod === 'przelewy24' ? 'Przejdź do płatności' : 'Złóż zamówienie'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Podsumowanie zamówienia */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Podsumowanie zamówienia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Lista produktów */}
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-start text-sm">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-gray-600">
                            {item.quantity}x {formatPrice(item.product.price)}
                          </p>
                          {item.notes && (
                            <p className="text-xs text-gray-500 italic">
                              {item.notes}
                            </p>
                          )}
                        </div>
                        <span className="font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Produkty</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    
                    {deliveryType === 'delivery' && (
                      <div className="flex justify-between text-sm">
                        <span>Dostawa</span>
                        <span>{formatPrice(deliveryFee)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Razem</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>

                  {/* Informacje o dostawie */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center gap-2">
                      {deliveryType === 'delivery' ? <Truck className="h-4 w-4" /> : <Store className="h-4 w-4" />}
                      {deliveryType === 'delivery' ? 'Dostawa' : 'Odbiór osobisty'}
                    </p>
                    {deliveryType === 'pickup' && (
                      <p className="text-xs">
                        {STORE_CONFIG.address.street}, {STORE_CONFIG.address.city}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}