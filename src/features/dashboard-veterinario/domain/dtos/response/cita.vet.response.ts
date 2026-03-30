import { CitaVet } from '../../entities/cita.vet.entity'

export interface CitaVetResponse {
  success: boolean
  data: CitaVet[]
}