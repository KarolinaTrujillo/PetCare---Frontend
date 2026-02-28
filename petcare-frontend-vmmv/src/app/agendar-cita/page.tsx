export default function AgendarCitaPage() {
  return (
    <div className="min-h-screen bg-[#F6F7F5] flex items-center justify-center px-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-3xl font-semibold text-[#1E293B] mb-4">
          Agendar Cita
        </h1>

        <p className="text-[#64748B] mb-8">
          Inicia el proceso para programar una cita para tu mascota.
        </p>

        <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400">
          Aquí irá el flujo de agendamiento (Paso 1 de 6)
        </div>
      </div>
    </div>
  );
}