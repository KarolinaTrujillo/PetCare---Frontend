export interface Mascota {
  id: number
  id_mascota: number
  id_user: number
  nombre: string
  especie: string
  raza: string | null
  fecha_nacimiento: string | null
  sexo: string | null
  peso: number | null
  activo: boolean
}