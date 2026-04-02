'use client'

import { useRouter } from 'next/navigation'
import { Ripple } from '@/src/core/components/ui/ripple'
import { steps } from '../../data/process.data'
import { ProcessCard } from './ProcessCard'
import { CalendarDays } from 'lucide-react'
import { Routes } from '@/src/core/navigator/routes'

export const ProcessComponent = () => {
  const router = useRouter()

  return (
    <section
      id="how"
      className="relative w-full min-h-[500px] bg-white px-6 md:px-14 lg:px-24 py-16 md:py-24 font-sans"
    >
      <div
        className="absolute right-0 top-0 w-1/2 pointer-events-none overflow-hidden"
        style={{ height: '100%', minHeight: '500px' }}
      >
        <Ripple
          mainCircleSize={300}
          mainCircleOpacity={0.35}
          numCircles={6}
          color="#267A6E"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header de sección */}
        <div className="mb-10 md:mb-14">
          <span className="text-xs font-medium tracking-widest uppercase text-[#267A6E]">
            Cómo funciona
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-2">
            Nuestro proceso
          </h2>
          <p className="text-gray-400 mt-3 max-w-md text-sm font-light">
            Un acompañamiento digital estructurado que garantiza el bienestar continuo después de cada consulta.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-[1fr_40px_1fr_40px_1fr] md:items-start md:gap-0">
          {steps.map((step, i) => (
            <>
              <ProcessCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                index={i}
              />

              {i < steps.length - 1 && (
                <div
                  key={`arrow-${i}`}
                  className="hidden md:flex items-center justify-center"
                  style={{ marginTop: `${i * 2 + 3}rem` }}
                >
                  <svg width="24" height="24" fill="none" stroke="#267A6E" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              )}
            </>
          ))}
        </div>

      </div>
    </section>
  )
}