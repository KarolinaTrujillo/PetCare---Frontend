export type EstadoMascota = "activo" | "inactivo";

export interface MascotaDetalleDTO {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  propietario: string;
  fotoUrl?: string;
}

export interface HistorialDTO {
  id: string;
  fecha: string; // ISO "2023-12-15"
  motivo: string;
  observaciones: string;
  veterinario: string;
}

export interface VacunaDTO {
  id: string;
  nombre: string;
  fechaAplicacion: string; // ISO "2024-01-15"
}
