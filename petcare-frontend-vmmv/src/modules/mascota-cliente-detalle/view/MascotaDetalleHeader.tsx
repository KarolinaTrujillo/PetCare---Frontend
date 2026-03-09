import React from "react";
import { MascotaDetalleUI } from "../model/ui.model";

interface MascotaDetalleHeaderProps {
  mascota: MascotaDetalleUI;
}

function DogIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="32" cy="38" rx="18" ry="14" />
      <circle cx="32" cy="20" r="10" />
      <ellipse cx="20" cy="14" rx="5" ry="8" />
      <ellipse cx="44" cy="14" rx="5" ry="8" />
      <circle cx="28" cy="20" r="1.5" fill="#4F8A7C" stroke="none" />
      <circle cx="36" cy="20" r="1.5" fill="#4F8A7C" stroke="none" />
      <path d="M29 25 q3 3 6 0" />
    </svg>
  );
}

function CatIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="32" cy="40" rx="16" ry="12" />
      <circle cx="32" cy="22" r="10" />
      <path d="M22 12 L18 4 L26 10" />
      <path d="M42 12 L46 4 L38 10" />
      <circle cx="28" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
      <circle cx="36" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
      <path d="M29 27 q3 2 6 0" />
    </svg>
  );
}

export default function MascotaDetalleHeader({ mascota }: MascotaDetalleHeaderProps) {
  const isGato = mascota.especie?.toLowerCase() === "gato";
  return (
    <div className="bg-[#F0F5F4] rounded-2xl px-6 py-5 flex items-center gap-5 mb-6">
      <div className="w-16 h-16 rounded-2xl bg-white border border-[#D4E6E2] flex items-center justify-center flex-shrink-0 shadow-sm">
        {isGato ? <CatIcon /> : <DogIcon />}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 leading-tight">{mascota.nombre}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{mascota.raza}</p>
      </div>
    </div>
  );
}
