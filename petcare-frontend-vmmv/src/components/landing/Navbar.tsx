"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#inicio" className="text-lg font-semibold text-gray-900">
          Pet<span className="text-primary-600">Care</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="#inicio" className="hover:text-primary-600 transition">
            Inicio
          </Link>
          <Link href="#servicios" className="hover:text-primary-600 transition">
            Servicios
          </Link>
          <Link href="#como-funciona" className="hover:text-primary-600 transition">
            Cómo funciona
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/register"
            className="bg-primary-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition"
          >
            Regístrate
          </Link>

          <Link
            href="/login"
            className="border border-primary-600 text-primary-600 px-5 py-2 rounded-xl text-sm font-medium hover:bg-primary-50 transition"
          >
            Acceso Cliente
          </Link>
        </div>
      </div>
    </header>
  );
}