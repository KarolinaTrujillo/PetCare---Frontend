import { Usuario } from '../entities/usuario.entity'
import { UpdatePerfilRequest } from '../dtos/request/update-perfil.request'

interface IUsuarioService {
  updatePerfil: (id: number, data: UpdatePerfilRequest) => Promise<Usuario>
}

export class UpdatePerfilUseCase {
  constructor(private readonly service: IUsuarioService) {}

  async execute(id: number, data: UpdatePerfilRequest): Promise<Usuario> {
    return await this.service.updatePerfil(id, data)
  }
}