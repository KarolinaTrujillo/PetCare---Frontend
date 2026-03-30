import { Role } from './role.entity'

export interface User {
  id: number
  nombre: string
  apellido: string
  email: string
  password: string
  telefono?: string
  rol: Role
  avatar_url?: string
}