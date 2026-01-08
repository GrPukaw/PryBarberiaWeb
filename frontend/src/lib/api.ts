const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiOptions {
  method?: string;
  body?: unknown;
  token?: string;
}

export async function api<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición');
  }

  return data as T;
}

// Auth endpoints
export const authApi = {
  register: (data: { email: string; password: string; name: string; phone?: string }) =>
    api<{ user: unknown; access_token: string }>('/auth/register', { method: 'POST', body: data }),
  
  login: (data: { email: string; password: string }) =>
    api<{ user: unknown; access_token: string }>('/auth/login', { method: 'POST', body: data }),
  
  getProfile: (token: string) =>
    api<{ user: unknown }>('/auth/profile', { token }),
};

// Services endpoints
export const servicesApi = {
  getAll: () => api<unknown[]>('/services'),
  getOne: (id: string) => api<unknown>(`/services/${id}`),
  create: (data: unknown, token: string) =>
    api<unknown>('/services', { method: 'POST', body: data, token }),
  update: (id: string, data: unknown, token: string) =>
    api<unknown>(`/services/${id}`, { method: 'PATCH', body: data, token }),
  delete: (id: string, token: string) =>
    api<unknown>(`/services/${id}`, { method: 'DELETE', token }),
};

// Appointments endpoints
export const appointmentsApi = {
  getAll: (token: string) => api<unknown[]>('/appointments', { token }),
  getMyAppointments: (token: string) => api<unknown[]>('/appointments/my-appointments', { token }),
  getOne: (id: string, token: string) => api<unknown>(`/appointments/${id}`, { token }),
  create: (data: unknown, token: string) =>
    api<unknown>('/appointments', { method: 'POST', body: data, token }),
  cancel: (id: string, token: string) =>
    api<unknown>(`/appointments/${id}/cancel`, { method: 'PATCH', token }),
  confirm: (id: string, token: string) =>
    api<unknown>(`/appointments/${id}/confirm`, { method: 'PATCH', token }),
};

// Users endpoints
export const usersApi = {
  getBarbers: (token: string) => api<unknown[]>('/users/barbers', { token }),
  getAll: (token: string) => api<unknown[]>('/users', { token }),
};

// Token management
export const tokenUtils = {
  save: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },
  get: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },
  remove: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },
};
