import { CitaVet } from '../../entities/cita.vet.entity'
import { CreateCitaVetRequest } from '../../dtos/request/create-cita-vet.request'

interface ICitasVetService {
  createCita: (data: CreateCitaVetRequest) => Promise<CitaVet>
}

export class CreateCitaVetUseCase {
  constructor(private readonly service: ICitasVetService) {}

  async execute(data: CreateCitaVetRequest): Promise<CitaVet> {
    return await this.service.createCita(data)
  }
}