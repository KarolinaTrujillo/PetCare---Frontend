import { Cita } from '../entities/cita.entity'

interface ICitaService {
  getCitas: () => Promise<Cita[]>
}

export class GetCitasUseCase {
  constructor(private readonly service: ICitaService) {}

  async execute(): Promise<Cita[]> {
    return await this.service.getCitas()
  }
}