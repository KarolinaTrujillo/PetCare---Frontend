export interface CardOverViewProps {
  id: number
  nombre_mascota: string
  nombre_dueno: string
  apellido_dueno: string
  nombre_veterinario: string
  apellido_veterinario: string
  especialidad: string
  nombre_servicio: string
  precio_servicio: string
  fecha: string
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA'
  observaciones_cliente?: string
}