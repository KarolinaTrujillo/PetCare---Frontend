import { CreateMascotaRequest } from '../dtos/request/create-mascota.request'
import { Mascota } from '../entities/mascota.entity'

interface IMascotaService {
  createMascota: (data: CreateMascotaRequest) => Promise<Mascota>
}

export class CreateMascotaUseCase {
  constructor(private readonly service: IMascotaService) {}

  async execute(data: CreateMascotaRequest): Promise<Mascota> {
    return await this.service.createMascota(data)
  }
}