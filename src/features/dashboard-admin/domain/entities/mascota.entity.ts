export interface MascotaAdmin {
  id: number
  nombre: string
  especie: string
  raza: string | null
  sexo: string | null
  peso: string | null
  fecha_nacimiento: string | null
  activo: boolean
  propietario?: string
  email_propietario?: string
}