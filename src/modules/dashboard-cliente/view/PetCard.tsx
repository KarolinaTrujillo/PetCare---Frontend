import React from "react";
import { PetUI } from "../model/ui.model";

const C = {
  green: "#5BAA9C",
  greenLight: "#E6F4F1",
  white: "#FFFFFF",
  textMain: "#1F2937",
  border: "#E5E7EB",
};

function PetIcon({ tipo }: { tipo: string }) {
  const isCat = tipo === "gato";
  return isCat ? (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="32" cy="40" rx="16" ry="12" />
      <circle cx="32" cy="22" r="10" />
      <path d="M22 12 L18 4 L26 10" />
      <path d="M42 12 L46 4 L38 10" />
      <circle cx="28" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
      <circle cx="36" cy="22" r="1.5" fill="#4F8A7C" stroke="none" />
      <path d="M29 27 q3 2 6 0" />
    </svg>
  ) : (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" stroke="#4F8A7C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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

interface PetCardProps {
  pet: PetUI;
  onVerMascota?: () => void;
}

export default function PetCard({ pet, onVerMascota }: PetCardProps) {
  return (
    <div
      style={{
        flex: "1 1 200px",
        backgroundColor: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: "20px",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
        cursor: "default",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "0 6px 20px rgba(91,170,156,0.15)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "0 1px 8px rgba(0,0,0,0.05)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Illustration */}
      <div
        style={{
          width: "110px", height: "110px",
          borderRadius: "50%",
          backgroundColor: C.greenLight,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <PetIcon tipo={pet.tipo} />
      </div>

      {/* Name */}
      <p style={{ fontSize: "16px", fontWeight: 700, color: C.textMain }}>{pet.nombre}</p>

      {/* CTA */}
      <button
        onClick={onVerMascota}
        style={{
          width: "100%",
          backgroundColor: C.white,
          color: "#4B5563",
          border: `1px solid ${C.border}`,
          borderRadius: "10px",
          padding: "8px 0",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
          transition: "border-color 0.15s, color 0.15s, background-color 0.15s",
        }}
        onMouseEnter={(e) => {
          const b = e.currentTarget as HTMLButtonElement;
          b.style.borderColor = C.green;
          b.style.color = C.green;
          b.style.backgroundColor = C.greenLight;
        }}
        onMouseLeave={(e) => {
          const b = e.currentTarget as HTMLButtonElement;
          b.style.borderColor = C.border;
          b.style.color = "#4B5563";
          b.style.backgroundColor = C.white;
        }}
      >
        Ver mascota
      </button>
    </div>
  );
}