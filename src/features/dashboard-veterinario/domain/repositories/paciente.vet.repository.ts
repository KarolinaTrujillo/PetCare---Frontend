import { PacienteVet } from '../entities/paciente.vet.entity'

export interface IPacienteVetRepository {
  getPacientes(): Promise<PacienteVet[]>
  getPacienteById(id: number): Promise<PacienteVet | null>
}