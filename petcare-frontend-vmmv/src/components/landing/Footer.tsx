export default function Footer() {
  return (
    <footer className="bg-white pt-28 pb-16">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div>
            <h3 className="text-xl font-semibold text-[#1E293B] mb-6">
              Pet<span className="text-[#2F8F83]">Care</span>
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-xs">
              Servicio digital de seguimiento post-consulta
              para garantizar el bienestar continuo de tu mascota.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#1E293B] mb-6 uppercase tracking-wide">
              Enlaces
            </h4>
            <ul className="space-y-4 text-sm text-[#64748B]">
              <li>Inicio</li>
              <li>Servicios</li>
              <li>Cómo funciona</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#1E293B] mb-6 uppercase tracking-wide">
              Soporte
            </h4>
            <ul className="space-y-4 text-sm text-[#64748B]">
              <li>Centro de ayuda</li>
              <li>Contacto</li>
              <li>Preguntas frecuentes</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#1E293B] mb-6 uppercase tracking-wide">
              Información
            </h4>
            <ul className="space-y-4 text-sm text-[#64748B]">
              <li>Términos y condiciones</li>
              <li>Política de privacidad</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E6F2F0] pt-8 text-center">
          <p className="text-xs text-[#94A3B8]">
            © {new Date().getFullYear()} PetCare. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
