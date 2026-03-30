import { MascotaAdmin } from '../entities/mascota.entity'

interface IMascotaService {
  getMascotas: () => Promise<MascotaAdmin[]>
}

export class GetMascotasUseCase {
  constructor(private readonly service: IMascotaService) {}

  async execute(): Promise<MascotaAdmin[]> {
    return await this.service.getMascotas()
  }
}