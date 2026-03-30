import { CitaVet, EstadoCitaVet } from '../entities/cita.vet.entity'
import { CreateCitaVetRequest } from '../dtos/request/create-cita-vet.request'

export interface ICitaVetRepository {
  getCitas(): Promise<CitaVet[]>
  updateStatus(id: number, estado: EstadoCitaVet): Promise<void>
  createCita(data: CreateCitaVetRequest): Promise<CitaVet>
  deleteCita(id: number): Promise<void>
}