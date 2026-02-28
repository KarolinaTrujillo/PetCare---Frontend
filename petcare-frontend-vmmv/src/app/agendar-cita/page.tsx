"use client";

import { useState } from "react";

type ServiceType = "chequeo" | "grooming" | null;

export default function AgendarCitaPage() {
  const [step, setStep] = useState(1);

  const [selectedService, setSelectedService] = useState<ServiceType>(null);
  const [motivo, setMotivo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [groomingOption, setGroomingOption] = useState("");

  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");

  const motivosConsulta = [
    "Vómito",
    "Diarrea",
    "Diarrea con sangre",
    "Se comió algo que no debía",
    "Se siente cansado",
    "Vacunación",
    "Seguimiento rutinario",
    "Desparasitación",
  ];

  const groomingOptions = [
    "Baño básico",
    "Baño + corte estándar",
    "Corte según raza",
    "Estilo creativo",
    "Tijera completo",
    "Deslanado y cepillado profundo",
  ];

  const isStep1Valid =
    selectedService &&
    ((selectedService === "chequeo" && motivo) ||
      (selectedService === "grooming" && groomingOption));

  const isStep2Valid =
    email.trim() !== "" &&
    nombre.trim() !== "" &&
    apellido.trim() !== "" &&
    telefono.trim().length >= 8;

  return (
    <div className="min-h-screen bg-[#F6F7F5] py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-12">

        {/* Step Indicator */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  s === step
                    ? "bg-[#2F8F83] text-white"
                    : s < step
                    ? "bg-[#A5D6CF] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* PASO 1 */}
        {step === 1 && (
          <>
            <h1 className="text-2xl font-semibold text-[#1E293B] text-center mb-2">
              Escoge un servicio
            </h1>

            <p className="text-sm text-[#64748B] text-center mb-10">
              Selecciona el tipo de atención que necesita tu mascota hoy.
            </p>

            {/* Chequeo */}
            <div
              onClick={() => setSelectedService("chequeo")}
              className={`border rounded-2xl p-6 mb-6 cursor-pointer transition-all
              ${
                selectedService === "chequeo"
                  ? "border-[#2F8F83] bg-[#E6F4F2]"
                  : "border-gray-200 hover:border-[#2F8F83]"
              }`}
            >
              <h3 className="font-semibold text-[#1E293B] mb-1">
                Chequeo médico
              </h3>
              <p className="text-sm text-[#64748B]">
                Consulta general y revisión.
              </p>

              {selectedService === "chequeo" && (
                <div className="mt-6 space-y-4">
                  <select
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2F8F83]"
                  >
                    <option value="">Motivo de la consulta</option>
                    {motivosConsulta.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <textarea
                    placeholder="Describe brevemente lo que sucede."
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-4 h-24 resize-none focus:ring-2 focus:ring-[#2F8F83]"
                  />
                </div>
              )}
            </div>

            {/* Grooming */}
            <div
              onClick={() => setSelectedService("grooming")}
              className={`border rounded-2xl p-6 mb-8 cursor-pointer transition-all
              ${
                selectedService === "grooming"
                  ? "border-[#2F8F83] bg-[#E6F4F2]"
                  : "border-gray-200 hover:border-[#2F8F83]"
              }`}
            >
              <h3 className="font-semibold text-[#1E293B] mb-1">
                Corte de pelo y baño
              </h3>
              <p className="text-sm text-[#64748B]">
                Estética y limpieza profesional.
              </p>

              {selectedService === "grooming" && (
                <select
                  value={groomingOption}
                  onChange={(e) => setGroomingOption(e.target.value)}
                  className="mt-6 w-full h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2F8F83]"
                >
                  <option value="">Selecciona una opción</option>
                  {groomingOptions.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex justify-center">
              <button
                disabled={!isStep1Valid}
                onClick={() => setStep(2)}
                className={`h-12 px-10 rounded-xl font-medium text-sm transition-all
                ${
                  isStep1Valid
                    ? "bg-[#2F8F83] text-white hover:bg-[#287A70]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continuar →
              </button>
            </div>
          </>
        )}

        {/* PASO 2 */}
        {step === 2 && (
          <>
            <h1 className="text-2xl font-semibold text-[#1E293B] mb-2">
              Tus datos
            </h1>

            <p className="text-sm text-[#64748B] mb-10">
              Completa tu información para continuar con la cita.
            </p>

            <div className="space-y-6">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2F8F83]"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2F8F83]"
                />

                <input
                  type="text"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2F8F83]"
                />
              </div>

              <input
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) =>
                  setTelefono(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2F8F83]"
              />
            </div>

            <div className="mt-10 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-sm text-[#64748B] hover:underline"
              >
                ← Volver
              </button>

              <button
                disabled={!isStep2Valid}
                className={`h-12 px-10 rounded-xl font-medium text-sm transition-all
                ${
                  isStep2Valid
                    ? "bg-[#2F8F83] text-white hover:bg-[#287A70]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continuar →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}