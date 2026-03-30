import { PacienteVet } from '../../entities/paciente.vet.entity'

interface IPacientesVetService {
  getPacienteById: (id: number) => Promise<PacienteVet | null>
}

export class GetPacienteByIdVetUseCase {
  constructor(private readonly service: IPacientesVetService) {}

  async execute(id: number): Promise<PacienteVet | null> {
    return await this.service.getPacienteById(id)
  }
}