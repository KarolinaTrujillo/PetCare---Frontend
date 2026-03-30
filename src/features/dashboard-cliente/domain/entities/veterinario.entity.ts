export interface Veterinario {
  id: number
  nombre: string
  apellido: string
  especialidad?: string | null
  email: string
  telefono?: string | null
  activo: boolean
}