'use client'

import { Ripple } from '@/src/core/components/ui/ripple'
import { steps } from '../../data/process.data'
import { ProcessCard } from './ProcessCard'
import { CalendarDays } from 'lucide-react'

export const ProcessComponent = () => {
  return (
    <section
      id="how"
      className="relative w-full min-h-[500px] bg-white px-6 md:px-14 lg:px-24 py-24 font-sans"
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

        <div className="mb-14">
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

        <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr_40px_1fr] items-start">
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
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </div>
              )}
            </>
          ))}
        </div>

        <div className="mt-14">
          <button className="bg-[#267A6E] hover:bg-[#1d6259] text-white text-sm font-semibold px-8 py-3.5 rounded-full transition-colors duration-200 cursor-pointer flex items-center gap-2">
            <CalendarDays size={16} />
            Agendar consulta
          </button>
        </div>

      </div>
    </section>
  )
}