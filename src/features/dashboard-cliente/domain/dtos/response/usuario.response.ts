import { Usuario } from '../../entities/usuario.entity'

export interface UsuarioResponse {
  success: boolean
  data: Usuario
}