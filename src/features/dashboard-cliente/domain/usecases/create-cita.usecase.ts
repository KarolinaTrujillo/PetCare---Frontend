import { CreateCitaRequest } from '../dtos/request/create-cita.request'
import { Cita } from '../entities/cita.entity'

interface ICitaService {
  createCita: (data: CreateCitaRequest) => Promise<Cita>
}

export class CreateCitaUseCase {
  constructor(private readonly service: ICitaService) {}

  async execute(data: CreateCitaRequest): Promise<Cita> {
    return await this.service.createCita(data)
  }
}