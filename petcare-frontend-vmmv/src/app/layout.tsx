import './globals.css';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata = {
  title: 'PetCare',
  description: 'Plataforma digital de seguimiento post-consulta veterinaria',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="scroll-smooth bg-white text-gray-900">
        <Navbar />
        <main className="pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}