import { CitaVet } from '../../entities/cita.vet.entity'

interface ICitasVetService {
  getCitas: () => Promise<CitaVet[]>
}

export class GetCitasVetUseCase {
  constructor(private readonly service: ICitasVetService) {}
  async execute(): Promise<CitaVet[]> {
    return await this.service.getCitas()
  }
}