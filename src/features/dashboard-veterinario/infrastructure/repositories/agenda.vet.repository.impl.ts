import { IAgendaVetRepository } from '../../domain/repositories/agenda.vet.repository'
import { AgendaVet } from '../../domain/entities/agenda.vet.entity'
import { CreateAgendaVetRequest } from '../../domain/dtos/request/create-agenda-vet.request'
import { agendaVetService } from '../services/agenda.vet.service'

export class AgendaVetRepositoryImpl implements IAgendaVetRepository {
  async getAgenda(vetId: number):                   Promise<AgendaVet[]> { return agendaVetService.getAgenda(vetId) }
  async createAgenda(data: CreateAgendaVetRequest): Promise<AgendaVet>   { return agendaVetService.createAgenda(data) }
  async updateStatus(id: number, estado: string):   Promise<void>        { return agendaVetService.updateStatus(id, estado) }
  async deleteAgenda(id: number):                   Promise<void>        { return agendaVetService.deleteAgenda(id) }
  async deleteAgendaByVeterinario(vetId: number):   Promise<void>        { return agendaVetService.deleteAgendaByVeterinario(vetId) }
}