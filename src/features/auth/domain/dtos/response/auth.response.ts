import { Role } from '../../entities/role.entity'

export interface AuthResponse {
  success: boolean
  token: string
  user: {
    id: number
    nombre: string
    apellido: string
    email: string
    telefono: string
    rol: Role
    avatar_url: string | null
  }
}