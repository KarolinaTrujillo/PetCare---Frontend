import { Usuario } from '../entities/usuario.entity'

interface IUsuarioService {
  getMe: () => Promise<Usuario>
}

export class GetUsuarioUseCase {
  constructor(private readonly service: IUsuarioService) {}

  async execute(): Promise<Usuario> {
    return await this.service.getMe()
  }
}