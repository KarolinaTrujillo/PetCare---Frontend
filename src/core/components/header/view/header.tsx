'use client'

import { useRouter } from 'next/navigation'
import { LogIn } from 'lucide-react'
import { headerLinks } from '../util/header'
import { Routes } from '@/src/core/navigator/routes'
import { useScrollTo } from '@/src/core/hooks/useScrollTo'

export const HeaderComponent = () => {
  const router = useRouter()
  const scrollTo = useScrollTo()

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] px-8 py-4 flex items-center justify-between">      
      <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
        <img src="/logo.webp" alt="PetCare" className="w-8 h-8" />
        <span className="text-xl font-bold">
          <span className="text-black">Pet</span>
          <span className="text-[#2F8F83]">Care</span>
        </span>
      </button>

      <nav className="flex items-center gap-8">
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

      <button
        onClick={() => router.push(Routes.auth.login)}
        className="flex items-center gap-2 bg-[#2F8F83] hover:bg-[#267a6e] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200 cursor-pointer"
      >
        <LogIn size={16} />
        Iniciar Ahora
      </button>
    </header>
  )
}