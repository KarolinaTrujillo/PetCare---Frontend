import { AgendaVet } from '../../entities/agenda.vet.entity'

interface IAgendaService { getAgenda: (vetId: number) => Promise<AgendaVet[]> }

export class GetAgendaVetUseCase {
  constructor(private readonly service: IAgendaService) {}
  async execute(vetId: number): Promise<AgendaVet[]> {
    return await this.service.getAgenda(vetId)
  }
}