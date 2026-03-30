'use client'

import { HeaderComponent } from '@/src/core/components/header/view/header'
import { HeroComponent } from '../components/hero/Hero'
import { ServicesComponent } from '../components/services/Services'
import { ScrollVelocityContainer, ScrollVelocityRow } from '@/src/core/components/ui/scroll-based-velocity'
import { ProcessComponent } from '../components/process/Process'

export const LandingPageScreen = () => {
  return (
    <div>
      <HeaderComponent/>
      <div id="hero"><HeroComponent/></div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8 bg-white">
        <ScrollVelocityContainer className="text-6xl font-semibold tracking-tight text-[#267A6E]">
          <ScrollVelocityRow baseVelocity={20} direction={1}>
            Consulta General · Vacunación · Cirugía · Grooming · Urgencias · Laboratorio ·
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={20} direction={-1}>
            Consulta General · Vacunación · Cirugía · Grooming · Urgencias · Laboratorio ·
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white" />
      </div>

      <div id="services"><ServicesComponent/></div>
      <div id="how"><ProcessComponent /></div>
    </div>
  )
}