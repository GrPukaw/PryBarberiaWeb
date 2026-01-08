'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appointmentsApi, tokenUtils } from '@/lib/api';

interface Appointment {
  id: string;
  date: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  service: {
    name: string;
    price: number;
    duration: number;
  };
  barber?: {
    name: string;
  };
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

const statusLabels = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmada',
  COMPLETED: 'Completada',
  CANCELLED: 'Cancelada',
};

export default function MyAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const token = tokenUtils.get();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const data = await appointmentsApi.getMyAppointments(token);
      setAppointments(data as Appointment[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar citas');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    const token = tokenUtils.get();
    if (!token) return;

    if (!confirm('¿Estás seguro de que quieres cancelar esta cita?')) return;

    try {
      await appointmentsApi.cancel(id, token);
      loadAppointments();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al cancelar');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-amber-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Cargando tus citas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Citas</h1>
            <p className="text-gray-600 mt-1">Gestiona tus reservas</p>
          </div>
          <button
            onClick={() => router.push('/booking')}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-gray-900 font-bold px-6 py-3 rounded-xl transition-all hover:scale-105"
          >
            + Nueva Cita
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
            {error}
          </div>
        )}

        {/* Appointments List */}
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {appointment.service.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[appointment.status]}`}>
                        {statusLabels[appointment.status]}
                      </span>
                    </div>
                    
                    <div className="text-gray-600 space-y-1">
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(appointment.date)}
                      </p>
                      {appointment.barber && (
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Barbero: {appointment.barber.name}
                        </p>
                      )}
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ${appointment.service.price} · {appointment.service.duration} min
                      </p>
                    </div>
                    
                    {appointment.notes && (
                      <p className="mt-3 text-sm text-gray-500 italic">
                        "{appointment.notes}"
                      </p>
                    )}
                  </div>

                  {(appointment.status === 'PENDING' || appointment.status === 'CONFIRMED') && (
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <span className="text-6xl mb-4 block">📅</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No tienes citas</h2>
            <p className="text-gray-600 mb-6">¡Reserva tu primera cita ahora!</p>
            <button
              onClick={() => router.push('/booking')}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-xl transition-all hover:scale-105"
            >
              Reservar Cita
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
