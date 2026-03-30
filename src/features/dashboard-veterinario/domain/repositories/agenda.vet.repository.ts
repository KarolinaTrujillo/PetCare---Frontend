import { AgendaVet } from '../entities/agenda.vet.entity'
import { CreateAgendaVetRequest } from '../dtos/request/create-agenda-vet.request'

export interface IAgendaVetRepository {
  getAgenda(vetId: number):                          Promise<AgendaVet[]>
  createAgenda(data: CreateAgendaVetRequest):        Promise<AgendaVet>
  updateStatus(id: number, estado: string):          Promise<void>
  deleteAgenda(id: number):                          Promise<void>
  deleteAgendaByVeterinario(vetId: number):          Promise<void>
}