import Hero from '@/components/landing/Hero';
import WhyPetCare from '@/components/landing/WhyPetCare';
import ProcessSection from '@/components/landing/ProcessSection';
import Benefits from '@/components/landing/Benefits';
import FinalCTA from '@/components/landing/FinalCTA';

export default function HomePage() {
  return (
    <>
      <section id="inicio" className="scroll-mt-24">
        <Hero />
      </section>

      <WhyPetCare />

      <section id="como-funciona" className="scroll-mt-24">
        <ProcessSection />
      </section>

      <section id="servicios" className="scroll-mt-24">
        <Benefits />
      </section>

      <FinalCTA />
    </>
  );
}