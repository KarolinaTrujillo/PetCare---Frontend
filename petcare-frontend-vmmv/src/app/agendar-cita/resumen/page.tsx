"use client";

import { useRouter } from "next/navigation";
import { useAgendarCita } from "../context";
import { useEffect } from "react";
import { ROUTES } from "@/lib/routes";

export default function ResumenPage() {
  const router = useRouter();

  const {
    service,
    motivo,
    groomingOption,
    nombre,
    apellido,
    email,
    telefono,
    especie,
    nombreMascota,
    raza,
    fecha,
    horario,
  } = useAgendarCita();

  useEffect(() => {
    if (!horario) {
      router.replace(ROUTES.PUBLIC.AGENDAR_CITA_HORARIO);
    }
  }, [horario, router]);

  const servicioTexto =
    service === "chequeo"
      ? `Chequeo médico - ${motivo}`
      : `Grooming - ${groomingOption}`;

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#1E293B] text-center mb-2">
        Resumen de tu cita
      </h1>

      <p className="text-sm text-[#64748B] text-center mb-10">
        Revisa la información antes de confirmar.
      </p>

      <div className="space-y-6 text-sm text-[#1E293B] mb-10">

        <div className="flex justify-between border-b pb-2">
          <span>Servicio</span>
          <span>{servicioTexto}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Paciente</span>
          <span>{nombreMascota} ({especie})</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Raza</span>
          <span>{raza}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Propietario</span>
          <span>{nombre} {apellido}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Contacto</span>
          <span>{email} | {telefono}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Fecha</span>
          <span>{fecha}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Horario</span>
          <span>{horario}</span>
        </div>

      </div>

      <div className="flex justify-between">
        <button
          onClick={() => router.push(ROUTES.PUBLIC.AGENDAR_CITA_HORARIO)}
          className="text-sm text-[#64748B]"
        >
          ← Volver
        </button>

        <button
          onClick={() =>
            router.push(ROUTES.PUBLIC.AGENDAR_CITA_CONFIRMADO)
          }
          className="h-12 px-10 rounded-xl font-medium text-sm bg-[#2F8F83] text-white"
        >
          Confirmar Cita
        </button>
      </div>
    </>
  );
}