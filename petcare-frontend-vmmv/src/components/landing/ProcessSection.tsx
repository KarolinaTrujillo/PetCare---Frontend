export default function ProcessSection() {
  return (
    <section className="bg-white py-32">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-[30px] lg:text-[34px] font-semibold text-[#1E293B] mb-4">
            Nuestro Proceso
          </h2>
          <p className="text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed">
            Un acompañamiento digital estructurado que garantiza el
            bienestar continuo después de cada consulta.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-16 text-center">
          <div className="hidden md:block absolute top-7 left-1/6 right-1/6 h-[2px] bg-[#E6F2F0]"></div>

          <div className="relative space-y-5">
            <div className="relative z-10 h-14 w-14 mx-auto rounded-full bg-[#2F8F83] text-white flex items-center justify-center text-lg font-semibold shadow-md">
              1
            </div>
            <h3 className="text-base font-semibold text-[#1E293B]">
              Consulta inicial
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Evaluación veterinaria y diagnóstico profesional.
            </p>
          </div>

          <div className="relative space-y-5">
            <div className="relative z-10 h-14 w-14 mx-auto rounded-full bg-[#2F8F83] text-white flex items-center justify-center text-lg font-semibold shadow-md">
              2
            </div>
            <h3 className="text-base font-semibold text-[#1E293B]">
              Plan digital
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Registro estructurado de indicaciones médicas.
            </p>
          </div>

          <div className="relative space-y-5">
            <div className="relative z-10 h-14 w-14 mx-auto rounded-full bg-[#2F8F83] text-white flex items-center justify-center text-lg font-semibold shadow-md">
              3
            </div>
            <h3 className="text-base font-semibold text-[#1E293B]">
              Seguimiento activo
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Recordatorios y monitoreo constante del progreso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
