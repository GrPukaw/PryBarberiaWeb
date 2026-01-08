// Imports de React y Next.js.
// A futuro, aquí podrías importar componentes como 'Header', 'Footer', 'AppointmentButton'.

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 font-sans text-gray-800">
      <header className="w-full bg-black text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold text-center tracking-tight">
          Barbería "El Buen Corte"
        </h1>
        <nav className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-yellow-400">Inicio</a>
          <a href="#" className="hover:text-yellow-400">Servicios</a>
          <a href="#" className="hover:text-yellow-400">Contacto</a>
        </nav>
      </header>
      
      <main className="flex-grow w-full max-w-4xl flex flex-col items-center justify-center py-12 px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Bienvenido a tu nueva barbería online
          </h2>
          <p className="text-lg mb-8">
            Este es el punto de partida. Desde aquí puedes construir tu sistema de reservas,
            mostrar tus servicios y mucho más.
          </p>
          <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Reservar una Cita
          </button>
        </div>

        <div className="w-full mt-16 text-left">
          <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Próximos Pasos:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Conectar este botón a la API del backend para crear citas.</li>
            <li>Crear una página de "Servicios" para mostrar los cortes y precios.</li>
            <li>Desarrollar un panel de administración para ver las citas.</li>
          </ul>
        </div>
      </main>

      <footer className="w-full bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Barbería "El Buen Corte" - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}