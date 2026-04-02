'use client'

import { useRouter } from 'next/navigation'
import { ServiceCard } from './ServiceCard'
import { services } from '../../data/services.data'
import { WordRotateConfetti } from '@/src/core/components/ui/WordRotateConfetti'
import { Routes } from '@/src/core/navigator/routes'

export const ServicesComponent = () => {
  const router = useRouter()

  return (
    <section id="services" className="bg-white px-6 md:px-14 lg:px-24 py-24 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header de sección */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-medium tracking-widest uppercase text-[#267A6E]">
              Lo que ofrecemos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black mt-2">
              Nuestros servicios
            </h2>
            <p className="text-gray-400 mt-3 max-w-md text-sm font-light">
              Atención integral para el bienestar de tu mascota, con profesionales comprometidos.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <WordRotateConfetti
              className="text-4xl md:text-5xl font-bold text-[#267A6E]"
              words={['Salud', 'Bienestar', 'Cuidado', 'Amor']}
            />
            <button
              onClick={() => router.push(Routes.auth.login)}
              className="bg-[#267A6E] text-white rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 hover:bg-[#1d6259] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#267A6E]/25"
            >
              Agendar consulta
            </button>
          </div>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              icon={service.icon}
              details={service.details}
            />
          ))}
        </div>

      </div>
    </section>
  )
}