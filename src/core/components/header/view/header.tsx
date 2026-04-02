'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn, Menu, X } from 'lucide-react'
import { headerLinks } from '../util/header'
import { Routes } from '@/src/core/navigator/routes'
import { useScrollTo } from '@/src/core/hooks/useScrollTo'

export const HeaderComponent = () => {
  const router = useRouter()
  const scrollTo = useScrollTo()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (href: string) => {
    scrollTo(href)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] px-6 md:px-8 py-4">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
          <img src="/logo.webp" alt="PetCare" className="w-8 h-8" />
          <span className="text-xl font-bold">
            <span className="text-black">Pet</span>
            <span className="text-[#2F8F83]">Care</span>
          </span>
        </button>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {headerLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="flex items-center gap-1.5 text-gray-600 hover:text-[#2F8F83] transition-colors duration-200 text-sm font-medium cursor-pointer"
            >
              <link.icon size={16} />
              {link.label}
            </button>
          ))}
        </nav>

        {/* Botón desktop */}
        <button
          onClick={() => router.push(Routes.auth.login)}
          className="hidden md:flex items-center gap-2 bg-[#2F8F83] hover:bg-[#267a6e] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200 cursor-pointer"
        >
          <LogIn size={16} />
          Iniciar Ahora
        </button>

        {/* Hamburguesa mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú mobile desplegable */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 pb-4 border-t border-gray-100 pt-4">
          {headerLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="flex items-center gap-2 text-gray-600 hover:text-[#2F8F83] text-sm font-medium transition-colors"
            >
              <link.icon size={16} />
              {link.label}
            </button>
          ))}
          <button
            onClick={() => router.push(Routes.auth.login)}
            className="flex items-center gap-2 bg-[#2F8F83] hover:bg-[#267a6e] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors w-fit"
          >
            <LogIn size={16} />
            Iniciar Ahora
          </button>
        </div>
      )}
    </header>
  )
}