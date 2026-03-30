import { Cita } from '@/src/features/dashboard-cliente/domain/entities/cita.entity'
import { CardOverViewProps } from '@/src/features/dashboard-cliente/presentation/types/card.overview.types'

export const citaToCardProps = (cita: Cita): CardOverViewProps => ({
  id: cita.id,
  nombre_mascota: cita.nombre_mascota,
  nombre_dueno: cita.nombre_dueno,
  apellido_dueno: cita.apellido_dueno,
  nombre_veterinario: cita.nombre_veterinario,
  apellido_veterinario: cita.apellido_veterinario,
  especialidad: cita.especialidad,
  nombre_servicio: cita.nombre_servicio,
  precio_servicio: cita.precio_servicio,
  fecha: cita.fecha,
  estado: cita.estado,
  observaciones_cliente: cita.observaciones_cliente,
})