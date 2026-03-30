export interface CardPetOverViewProps {
  id: number
  nombre: string
  especie: string
  raza: string | null
  edad: number | null
  nombre_dueno: string
  apellido_dueno: string
  fecha_registro: string | null
  activo: boolean
}