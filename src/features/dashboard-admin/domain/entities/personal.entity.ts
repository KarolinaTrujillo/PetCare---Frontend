export type RolPersonal = 'ADMIN' | 'VETERINARIO'

export interface Personal {
  id: number
  nombre: string
  apellido: string
  email: string
  telefono?: string | null
  rol: RolPersonal
  activo?: boolean
  cedula_profesional?: string | null
  especialidad?: string | null
  avatar_url?: string | null
}