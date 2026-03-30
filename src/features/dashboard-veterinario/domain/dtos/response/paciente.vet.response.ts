import { PacienteVet } from '../../entities/paciente.vet.entity'

export interface PacienteVetResponse {
  success: boolean
  data: PacienteVet[]
}

export interface PacienteVetSingleResponse {
  success: boolean
  data: PacienteVet
}