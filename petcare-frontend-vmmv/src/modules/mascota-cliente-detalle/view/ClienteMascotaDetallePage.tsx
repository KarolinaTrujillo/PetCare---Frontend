"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MascotaDetalleHeader from "./MascotaDetalleHeader";
import MascotaTabs from "./MascotaTabs";
import HistorialTab from "./HistorialTab";
import CartillaVacunacionTab from "./CartillaVacunacionTab";
import { MascotaDetalleUI, HistorialUI, VacunaUI, TabActivo } from "../model/ui.model";

const mockMascota: MascotaDetalleUI = {
  id: "1",
  nombre: "Firulais",
  especie: "Perro",
  raza: "Golden Retriever",
  edad: "3 años",
  propietario: "Juan Pérez",
};

const mockHistorial: HistorialUI[] = [
  {
    id: "1",
    fechaFormateada: "15 DIC 2023",
    motivo: "Chequeo General Preventivo",
    observaciones: "Se realiza examen físico completo. El paciente presenta excelente condición corporal. Se observa dentadura limpia y encías sanas. El pelaje está brillante sin presencia de ectoparásitos.",
    veterinario: "Dr. Alejandro Ruiz",
  },
  {
    id: "2",
    fechaFormateada: "22 OCT 2023",
    motivo: "Tratamiento Dermatológico",
    observaciones: "Consulta por prurito intenso en zona abdominal y patas. Se diagnostica dermatitis alérgica estacional. Se receta shampoo medicado y dieta hipoalergénica por 15 días.",
    veterinario: "Dra. Elena Martínez",
  },
  {
    id: "3",
    fechaFormateada: "10 AGO 2023",
    motivo: "Vacunación Anual",
    observaciones: "Se aplican refuerzos del esquema anual. Paciente tranquilo durante el procedimiento. Sin reacciones adversas al momento de la consulta.",
    veterinario: "Dr. Alejandro Ruiz",
  },
];

const mockVacunas: VacunaUI[] = [
  { id: "1", nombre: "Antirrábica", fecha: "15 Ene 2024" },
  { id: "2", nombre: "Séxtuple Canina (DHPPI+L)", fecha: "12 Dic 2023" },
  { id: "3", nombre: "Bordetella", fecha: "10 Oct 2023" },
  { id: "4", nombre: "Refuerzo Anual Polivalente", fecha: "20 Jun 2023" },
];

// ─── Back arrow icon ──────────────────────────────────────────────────────────
function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
interface ClienteMascotaDetallePageProps {
  mascotaId: string;
}

export function ClienteMascotaDetallePage({ mascotaId: _ }: ClienteMascotaDetallePageProps) {
  const router = useRouter();
  const [tabActivo, setTabActivo] = useState<TabActivo>("historial");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F7F9FB", padding: "32px" }}>
      {/* Page title + breadcrumb */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeftIcon />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Perfil de Mascota</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Mis mascotas{" "}
            <span className="text-[#4F8A7C] font-medium">/ {mockMascota.nombre}</span>
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "860px" }}>
        <MascotaDetalleHeader mascota={mockMascota} />
        <MascotaTabs tabActivo={tabActivo} onTabChange={setTabActivo} />
        {tabActivo === "historial" && <HistorialTab historial={mockHistorial} />}
        {tabActivo === "vacunas" && (
          <CartillaVacunacionTab vacunas={mockVacunas} isLoadingVacunas={false} />
        )}
      </div>
    </div>
  );
}
