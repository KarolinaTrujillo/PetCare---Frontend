import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import WhyPetCare from '@/components/landing/WhyPetCare';
import ProcessSection from '@/components/landing/ProcessSection';
import Benefits from '@/components/landing/Benefits';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyPetCare />
      <ProcessSection />
      <Benefits />
      <FinalCTA />
      <Footer />
    </>
  );
}