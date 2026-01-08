'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { tokenUtils } from '@/lib/api';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!tokenUtils.get());
  }, []);

  const handleLogout = () => {
    tokenUtils.remove();
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">✂️</span>
            <span className="font-bold text-xl bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              El Buen Corte
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Inicio
            </Link>
            <Link href="/services" className="hover:text-amber-400 transition-colors">
              Servicios
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/booking" className="hover:text-amber-400 transition-colors">
                  Reservar
                </Link>
                <Link href="/my-appointments" className="hover:text-amber-400 transition-colors">
                  Mis Citas
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hover:text-amber-400 transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block py-2 hover:text-amber-400">Inicio</Link>
            <Link href="/services" className="block py-2 hover:text-amber-400">Servicios</Link>
            {isLoggedIn ? (
              <>
                <Link href="/booking" className="block py-2 hover:text-amber-400">Reservar</Link>
                <Link href="/my-appointments" className="block py-2 hover:text-amber-400">Mis Citas</Link>
                <button onClick={handleLogout} className="block py-2 text-red-400">Cerrar Sesión</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 hover:text-amber-400">Iniciar Sesión</Link>
                <Link href="/register" className="block py-2 text-amber-400">Registrarse</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
