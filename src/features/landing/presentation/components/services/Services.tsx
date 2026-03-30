'use client'

import { ServiceCard } from './ServiceCard'
import { services } from '../../data/services.data'
import { WordRotateConfetti } from '@/src/core/components/ui/WordRotateConfetti'

export const ServicesComponent = () => {
  return (
    <section id="services" className="bg-white px-6 md:px-14 lg:px-24 py-24 font-sans">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-14">
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

          <WordRotateConfetti 
            className="text-4xl md:text-5xl font-bold text-[#267A6E]"
            words={['Salud', 'Bienestar', 'Cuidado', 'Amor']}
          />
        </div>

        <div className="flex flex-wrap gap-8 justify-start">
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