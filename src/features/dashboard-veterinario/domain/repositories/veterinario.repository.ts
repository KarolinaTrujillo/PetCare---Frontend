import { Veterinario } from '../entities/veterinario.entity'
import { UpdatePerfilVetRequest } from '../dtos/request/update-perfil-vet.request'

export interface IVeterinarioRepository {
  getMe(): Promise<Veterinario>
  updatePerfil(id: number, data: UpdatePerfilVetRequest): Promise<Veterinario>
  changePassword(passwordActual: string, nuevaPassword: string): Promise<void>
}