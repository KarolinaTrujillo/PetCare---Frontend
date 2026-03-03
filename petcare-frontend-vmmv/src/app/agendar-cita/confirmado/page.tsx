"use client";

import { useRouter } from "next/navigation";
import { useAgendarCita } from "../context";
import { useEffect } from "react";
import { ROUTES } from "@/lib/routes";

export default function ConfirmadoPage() {
  const router = useRouter();
  const { resetFlow } = useAgendarCita();

  useEffect(() => {
    resetFlow();
  }, [resetFlow]);

  return (
    <div className="text-center space-y-8">
      <h1 className="text-2xl font-semibold text-[#1E293B]">
        ¡Cita confirmada!
      </h1>

      <p className="text-sm text-[#64748B]">
        Tu cita fue registrada correctamente.
        Recibirás una confirmación por correo.
      </p>

      <button
        onClick={() => router.push(ROUTES.PUBLIC.HOME)}
        className="h-12 px-10 rounded-xl font-medium text-sm bg-[#2F8F83] text-white"
      >
        Volver al inicio
      </button>
    </div>
  );
}