"use client";

import { AgendarCitaProvider } from "./context";
import { usePathname } from "next/navigation";

function StepIndicator() {
  const pathname = usePathname();

  const stepMap: Record<string, number> = {
    "/agendar-cita": 1,
    "/agendar-cita/servicio": 1,
    "/agendar-cita/datos": 2,
    "/agendar-cita/mascota": 3,
    "/agendar-cita/fecha": 4,
    "/agendar-cita/horario": 5,
    "/agendar-cita/resumen": 6,
    "/agendar-cita/confirmado": 6,
  };

  const currentStep = stepMap[pathname] || 1;

  return (
    <div className="flex justify-center mb-10">
      <div className="flex items-center gap-4">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div
            key={step}
            className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
              ${
                step === currentStep
                  ? "bg-[#2F8F83] text-white scale-110"
                  : step < currentStep
                  ? "bg-[#A5D6CF] text-white"
                  : "bg-gray-200 text-gray-500"
              }
            `}
          >
            {step < currentStep ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              step
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AgendarCitaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AgendarCitaProvider>
      <div className="min-h-screen bg-[#F6F7F5] py-20 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-12">
          <StepIndicator />
          {children}
        </div>
      </div>
    </AgendarCitaProvider>
  );
}
