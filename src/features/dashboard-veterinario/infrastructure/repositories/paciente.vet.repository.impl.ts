import { IPacienteVetRepository } from '../../domain/repositories/paciente.vet.repository'
import { PacienteVet } from '../../domain/entities/paciente.vet.entity'
import { pacientesVetService } from '../services/pacientes.vet.service'

export class PacienteVetRepositoryImpl implements IPacienteVetRepository {
  async getPacientes(): Promise<PacienteVet[]> {
    return await pacientesVetService.getPacientes()
  }

  async getPacienteById(id: number): Promise<PacienteVet | null> {
    return await pacientesVetService.getPacienteById(id)
  }
}