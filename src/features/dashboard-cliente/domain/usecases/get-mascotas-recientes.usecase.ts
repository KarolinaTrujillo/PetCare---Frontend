import { Mascota } from '../entities/mascota.entity'

interface IMascotaService {
  getMascotasRecientes: () => Promise<Mascota[]>
}

export class GetMascotasRecientesUseCase {
  constructor(private readonly service: IMascotaService) {}

  async execute(): Promise<Mascota[]> {
    return await this.service.getMascotasRecientes()
  }
}