export interface Servicio {
  id_servicio: number;
  nombre: string;
  descripcion: string;
  duracion_minutos: number;
  costo?: number;
  activo: boolean;
}

export interface Veterinario {
  id_personal: number;
  nombre: string;
  apellido: string;
  especialidad: string;
}

export interface Mascota {
  id_mascota: number;
  nombre: string;
  id_especie: number;
  id_raza: number;
  nombre_especie?: string;
  nombre_raza?: string;
}
