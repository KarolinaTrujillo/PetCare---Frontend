export type EstadoCitaAdmin = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA'

export interface CitaAdminProps {
  id: number
  nombre_mascota: string
  nombre_dueno: string
  apellido_dueno: string
  nombre_veterinario: string
  apellido_veterinario: string
  nombre_servicio: string
  fecha: string
  estado: EstadoCitaAdmin
}