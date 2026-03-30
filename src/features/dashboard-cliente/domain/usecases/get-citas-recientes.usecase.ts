import { Cita } from '../entities/cita.entity'

interface ICitaService {
  getCitasRecientes: () => Promise<Cita[]>
}

export class GetCitasRecientesUseCase {
  constructor(private readonly service: ICitaService) {}

  async execute(): Promise<Cita[]> {
    return await this.service.getCitasRecientes()
  }
}