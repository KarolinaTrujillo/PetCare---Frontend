import { Mascota } from '@/src/features/dashboard-cliente/domain/entities/mascota.entity'
import { CardPetOverViewProps } from '@/src/features/dashboard-cliente/presentation/types/pet.overview.types'

export const mascotaToCardProps = (mascota: Mascota): CardPetOverViewProps => {
  const edad = mascota.fecha_nacimiento
    ? Math.floor((Date.now() - new Date(mascota.fecha_nacimiento).getTime()) / (1000 * 60 * 60 * 24 * 365))
    : null

  const user = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user') ?? '{}')
    : {}

  return {
    id: mascota.id,
    nombre: mascota.nombre,
    especie: mascota.especie,
    raza: mascota.raza ?? 'Sin raza',
    edad,
    nombre_dueno: user.nombre ?? '',
    apellido_dueno: user.apellido ?? '',
    fecha_registro: (mascota as any).fecha_registro ?? mascota.fecha_nacimiento,
    activo: mascota.activo,
  }
}