'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { servicesApi, usersApi, appointmentsApi, tokenUtils } from '@/lib/api';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface Barber {
  id: string;
  name: string;
}

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get('service');

  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    serviceId: preSelectedService || '',
    barberId: '',
    date: '',
    time: '',
    notes: '',
  });

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    const token = tokenUtils.get();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const [servicesData, barbersData] = await Promise.all([
        servicesApi.getAll(),
        usersApi.getBarbers(token),
      ]);
      setServices(servicesData as Service[]);
      setBarbers(barbersData as Barber[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const token = tokenUtils.get();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      await appointmentsApi.create({
        serviceId: formData.serviceId,
        barberId: formData.barberId || undefined,
        date: dateTime.toISOString(),
        notes: formData.notes || undefined,
      }, token);

      setSuccess(true);
      setTimeout(() => {
        router.push('/my-appointments');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la cita');
    } finally {
      setSubmitting(false);
    }
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const selectedService = services.find(s => s.id === formData.serviceId);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-amber-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Cita Reservada!</h2>
          <p className="text-gray-600">Tu cita ha sido creada exitosamente. Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">📅</span>
          <h1 className="text-3xl font-bold text-gray-900">Reservar Cita</h1>
          <p className="text-gray-600 mt-2">Selecciona el servicio, fecha y hora de tu preferencia</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-2">
                Servicio *
              </label>
              <select
                id="serviceId"
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              >
                <option value="">Selecciona un servicio</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ${service.price} ({service.duration} min)
                  </option>
                ))}
              </select>
            </div>

            {/* Barber Selection */}
            <div>
              <label htmlFor="barberId" className="block text-sm font-medium text-gray-700 mb-2">
                Barbero <span className="text-gray-400">(opcional)</span>
              </label>
              <select
                id="barberId"
                name="barberId"
                value={formData.barberId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              >
                <option value="">Sin preferencia</option>
                {barbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={minDate}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                  Hora *
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  min="09:00"
                  max="20:00"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notas adicionales <span className="text-gray-400">(opcional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Alguna preferencia o nota especial..."
              />
            </div>

            {/* Summary */}
            {selectedService && (
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Resumen de tu cita</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Servicio:</span> {selectedService.name}</p>
                  <p><span className="font-medium">Duración:</span> {selectedService.duration} minutos</p>
                  <p><span className="font-medium">Precio:</span> ${selectedService.price}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Reservando...
                </span>
              ) : (
                'Confirmar Reserva'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-amber-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <BookingForm />
    </Suspense>
  );
}
