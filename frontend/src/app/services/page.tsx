'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ServiceCard from '@/components/ServiceCard';
import { servicesApi, tokenUtils } from '@/lib/api';

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  imageUrl?: string;
}

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await servicesApi.getAll();
      setServices(data as Service[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar servicios');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (serviceId: string) => {
    const token = tokenUtils.get();
    if (!token) {
      router.push('/login');
      return;
    }
    router.push(`/booking?service=${serviceId}`);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-amber-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Cargando servicios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra amplia gama de servicios profesionales. Cada corte es una obra de arte.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center">
            {error}
          </div>
        )}

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                description={service.description}
                price={service.price}
                duration={service.duration}
                imageUrl={service.imageUrl}
                onBook={handleBook}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">✂️</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No hay servicios disponibles</h2>
            <p className="text-gray-600">Próximamente agregaremos nuevos servicios.</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas algo especial?</h2>
          <p className="text-gray-300 mb-6">
            Contáctanos para servicios personalizados o para grupos grandes.
          </p>
          <a
            href="tel:+1234567890"
            className="inline-block bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-xl transition-all hover:scale-105"
          >
            Llamar Ahora
          </a>
        </div>
      </div>
    </div>
  );
}
