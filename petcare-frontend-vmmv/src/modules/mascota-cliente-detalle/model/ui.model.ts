export interface MascotaDetalleUI {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  edad: string; // "3 años"
  propietario: string;
  fotoUrl?: string;
}

export interface HistorialUI {
  id: string;
  fechaFormateada: string; // "15 DIC 2023"
  motivo: string;
  observaciones: string;
  veterinario: string;
}

export interface VacunaUI {
  id: string;
  nombre: string;
  fecha: string; // "15 Ene 2024"
}

export type TabActivo = "historial" | "vacunas";
