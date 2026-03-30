import { EstadoCitaVet } from '../../entities/cita.vet.entity'

interface ICitasVetService {
  updateStatus: (id: number, estado: EstadoCitaVet) => Promise<void>
}

export class UpdateCitaStatusUseCase {
  constructor(private readonly service: ICitasVetService) {}
  async execute(id: number, estado: EstadoCitaVet): Promise<void> {
    return await this.service.updateStatus(id, estado)
  }
}