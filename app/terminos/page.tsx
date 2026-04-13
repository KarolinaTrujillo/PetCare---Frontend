import Link from 'next/link'
import { Routes } from '@/src/core/navigator/routes'
import { HeaderComponent } from '@/src/core/components/header/view/header'

export default function TerminosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderComponent />
      <div className="flex-1 max-w-3xl mx-auto px-6 py-12">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Términos y Condiciones de Uso</h1>

        <div className="flex flex-col gap-8 text-sm text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">1. Aceptación de los términos</h2>
            <p>Al registrarte y usar la plataforma PetCare, aceptas estos términos en su totalidad. Si no estás de acuerdo, no uses el servicio.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">2. Descripción del servicio</h2>
            <p>PetCare es una plataforma digital que permite a los usuarios agendar citas veterinarias, gestionar el historial clínico de sus mascotas y recibir notificaciones sobre sus citas.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">3. Registro y cuenta</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Debes proporcionar información veraz y actualizada al registrarte.</li>
              <li>Eres responsable de mantener la confidencialidad de tu contraseña.</li>
              <li>PetCare se reserva el derecho de suspender cuentas con información falsa.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">4. Uso del servicio</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>El servicio es exclusivo para la gestión de citas veterinarias.</li>
              <li>Queda prohibido usar la plataforma para fines ilícitos o fraudulentos.</li>
              <li>No está permitido compartir tu cuenta con terceros.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">5. Privacidad y datos personales</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Los datos personales que proporciones serán usados únicamente para la prestación del servicio.</li>
              <li>No compartimos tu información con terceros sin tu consentimiento, salvo obligación legal.</li>
              <li>Tienes derecho a solicitar la eliminación de tus datos en cualquier momento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">6. Citas y cancelaciones</h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Las citas deben cancelarse con al menos 24 horas de anticipación.</li>
              <li>PetCare no se hace responsable por citas no atendidas por causas ajenas a la plataforma.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">7. Limitación de responsabilidad</h2>
            <p>PetCare es una plataforma de gestión. La responsabilidad del servicio veterinario recae en el profesional que atiende a tu mascota.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">8. Modificaciones</h2>
            <p>PetCare puede modificar estos términos en cualquier momento. Se notificará a los usuarios registrados sobre cambios importantes.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">9. Contacto</h2>
            <p>Para dudas o aclaraciones, contáctanos a través de la plataforma.</p>
          </section>

        </div>

        <div className="mt-12">
          <Link
            href={Routes.auth.register}
            className="text-sm text-[#267A6E] font-medium hover:underline"
          >
            ← Volver al registro
          </Link>
        </div>

      </div>
    </div>
  )
}