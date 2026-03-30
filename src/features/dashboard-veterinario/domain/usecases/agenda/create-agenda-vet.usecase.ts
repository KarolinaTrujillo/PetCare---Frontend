import { AgendaVet } from '../../entities/agenda.vet.entity'
import { CreateAgendaVetRequest } from '../../dtos/request/create-agenda-vet.request'

interface IAgendaService { createAgenda: (data: CreateAgendaVetRequest) => Promise<AgendaVet> }

export class CreateAgendaVetUseCase {
  constructor(private readonly service: IAgendaService) {}
  async execute(data: CreateAgendaVetRequest): Promise<AgendaVet> {
    return await this.service.createAgenda(data)
  }
}