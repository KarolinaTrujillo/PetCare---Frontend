import { PacienteVet } from '../../entities/paciente.vet.entity'

interface IPacientesVetService {
  getPacientes: () => Promise<PacienteVet[]>
}

export class GetPacientesVetUseCase {
  constructor(private readonly service: IPacientesVetService) {}

  async execute(): Promise<PacienteVet[]> {
    return await this.service.getPacientes()
  }
}