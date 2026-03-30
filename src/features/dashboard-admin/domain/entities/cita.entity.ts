export type EstadoCita = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA' | 'ATENDIDA'

export interface Cita {
  id: number
  fecha: string
  estado: EstadoCita
  mascota: string
  dueno: string
  veterinario: string
  servicio: string
  precio: string
  especialidad?: string
  observaciones_cliente?: string | null
}