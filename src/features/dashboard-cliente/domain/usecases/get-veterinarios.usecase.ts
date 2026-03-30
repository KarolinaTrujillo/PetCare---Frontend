import { Veterinario } from '../entities/veterinario.entity'

interface IVeterinarioService {
  getVeterinarios: () => Promise<Veterinario[]>
}

export class GetVeterinariosUseCase {
  constructor(private readonly service: IVeterinarioService) {}

  async execute(): Promise<Veterinario[]> {
    return await this.service.getVeterinarios()
  }
}