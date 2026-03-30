import { Cliente } from '../../entities/cliente.entity'

export interface ClienteResponse {
  success: boolean
  data: Cliente[]
}