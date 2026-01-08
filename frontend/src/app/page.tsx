import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32 relative z-10">
          <div className="text-center">
            <span className="inline-block text-7xl mb-6 animate-bounce">✂️</span>
            <h1 className="text-5xl sm:text-7xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                El Buen Corte
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Donde el estilo se encuentra con la tradición. Cortes modernos, 
              atención personalizada y la mejor experiencia de barbería.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
              >
                Reservar Ahora
              </Link>
              <Link
                href="/services"
                className="border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:bg-white/10"
              >
                Ver Servicios
              </Link>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            ¿Por qué elegirnos?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👨‍🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Barberos Expertos</h3>
              <p className="text-gray-600">
                Nuestro equipo cuenta con años de experiencia y está constantemente actualizado con las últimas tendencias.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reservas Online</h3>
              <p className="text-gray-600">
                Sistema de reservas fácil y rápido. Elige tu horario preferido sin esperas innecesarias.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Calidad Premium</h3>
              <p className="text-gray-600">
                Utilizamos los mejores productos y herramientas profesionales para garantizar resultados excepcionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Ofrecemos una amplia variedad de servicios para que te veas y te sientas increíble.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Corte Clásico', price: '$15', icon: '✂️' },
              { name: 'Barba', price: '$10', icon: '🧔' },
              { name: 'Corte + Barba', price: '$22', icon: '💈' },
              { name: 'Afeitado Tradicional', price: '$12', icon: '🪒' },
            ].map((service) => (
              <div
                key={service.name}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-amber-600 font-bold text-lg">{service.price}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Ver todos los servicios →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-yellow-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ¿Listo para tu nuevo look?
          </h2>
          <p className="text-gray-800 mb-8 text-lg">
            Reserva ahora y experimenta la diferencia de un corte profesional.
          </p>
          <Link
            href="/register"
            className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
          >
            Crear Cuenta Gratis
          </Link>
        </div>
      </section>
    </div>
  );
}