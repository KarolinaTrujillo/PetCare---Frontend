import { ICitaVetRepository } from '../../domain/repositories/cita.vet.repository'
import { CitaVet, EstadoCitaVet } from '../../domain/entities/cita.vet.entity'
import { CreateCitaVetRequest } from '../../domain/dtos/request/create-cita-vet.request'
import { citasVetService } from '../services/citas.vet.service'

export class CitaVetRepositoryImpl implements ICitaVetRepository {
  async getCitas(): Promise<CitaVet[]> {
    return await citasVetService.getCitas()
  }

  async updateStatus(id: number, estado: EstadoCitaVet): Promise<void> {
    return await citasVetService.updateStatus(id, estado)
  }

  async createCita(data: CreateCitaVetRequest): Promise<CitaVet> {
    return await citasVetService.createCita(data)
  }

  async deleteCita(id: number): Promise<void> {
    return await citasVetService.deleteCita(id)
  }
}