export type EstadoCita = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA'

export interface Cita {
  id: number
  id_user: number
  id_mascota: number
  id_servicio: number
  id_veterinario: number
  id_agenda: number
  fecha: string
  estado: EstadoCita
  observaciones_cliente?: string
  nombre_mascota: string
  nombre_dueno: string
  apellido_dueno: string
  email_dueno: string
  telefono_dueno: string
  nombre_veterinario: string
  apellido_veterinario: string
  especialidad: string
  nombre_servicio: string
  precio_servicio: string
  created_at: string
  updated_at: string
}