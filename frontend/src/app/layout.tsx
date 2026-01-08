import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barbería El Buen Corte - Sistema de Reservas",
  description: "Reserva tu cita en la mejor barbería de la ciudad. Cortes modernos, servicio profesional.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Navbar />
        <main>{children}</main>
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400">
              © 2024 Barbería "El Buen Corte" - Todos los derechos reservados
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
