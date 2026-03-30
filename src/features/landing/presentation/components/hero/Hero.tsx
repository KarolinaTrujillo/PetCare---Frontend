'use client'

import Image from 'next/image'
import { cn } from '@/src/core/lib/utils'
import { InteractiveGridPattern } from '@/src/core/components/ui/interactive-grid-pattern'

export const HeroComponent = () => {
  return (
    <section className="relative min-h-screen bg-white flex items-center px-6 md:px-14 lg:px-24 py-24 font-sans overflow-hidden">

      <InteractiveGridPattern
        className={cn(
          'absolute inset-0 z-0',
          '[mask-image:radial-gradient(600px_circle_at_70%_50%,white,transparent)]'
        )}
        width={40}
        height={40}
        squares={[32, 32]}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6 animate-[fadeUp_0.7s_ease_both]">
          <div className="flex items-center gap-2 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#267A6E] animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#267A6E]">
              Clínica Veterinaria
            </span>
          </div>

          <h1 className="font-serif text-[#000000] leading-[1.1] text-5xl md:text-6xl lg:text-7xl font-bold">
            Cuidamos a tu{' '}
            <em className="text-[#267A6E] italic">mejor</em>
            <br />
            amigo
          </h1>

          <p className="text-gray-400 leading-relaxed max-w-md text-base font-light">
            Atención veterinaria de calidad con el amor y dedicación que tu
            mascota merece. Expertos comprometidos con su bienestar.
          </p>

          <div className="flex flex-wrap gap-3 mt-1">
            <button className="bg-[#267A6E] text-white rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 hover:bg-[#1d6259] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#267A6E]/25">
              Agendar cita
            </button>
            <button className="bg-transparent text-[#000000] border border-[#000000] rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 hover:bg-[#000000] hover:text-white hover:-translate-y-0.5">
              Nuestros servicios
            </button>
          </div>

          <div className="flex gap-10 mt-4 pt-6 border-t border-gray-100">
            {[
              { num: '500+', label: 'Pacientes atendidos' },
              { num: '10+',  label: 'Años de experiencia' },
              { num: '98%',  label: 'Clientes satisfechos' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="font-serif text-[#000000] text-3xl font-semibold">{num}</p>
                <p className="text-gray-400 text-xs font-light mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center items-center h-[520px]">
          <div className="absolute inset-0 rounded-[60%_40%_55%_45%/50%_60%_40%_50%] bg-[#267A6E]/[0.06]" />
          <div className="absolute inset-8 rounded-[40%_60%_45%_55%/60%_40%_60%_40%] bg-[#267A6E]/[0.03]" />
          <div className="absolute top-6 right-6 grid grid-cols-5 gap-2">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#267A6E]/25" />
            ))}
          </div>
          <div className="relative z-10 w-[380px] h-[420px] animate-bounce [animation-duration:3s] [animation-timing-function:ease-in-out]">
            <Image
              src="/pet.webp"
              alt="Mascota"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="absolute bottom-10 -left-2 z-20 bg-white rounded-2xl shadow-lg border border-black/[0.04] px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#267A6E] flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[0.7rem] text-gray-400 font-light">Próxima cita</p>
              <p className="text-sm font-medium text-[#000000]">Hoy, 3:00 PM</p>
            </div>
          </div>

          <div className="absolute top-10 -right-2 z-20 bg-white rounded-2xl shadow-lg border border-black/[0.04] px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#267A6E]/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[#267A6E]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[0.7rem] text-gray-400 font-light">Valoración</p>
              <p className="text-sm font-medium text-[#000000]">4.9 / 5.0</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 