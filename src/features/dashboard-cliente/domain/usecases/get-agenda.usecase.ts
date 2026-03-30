import { Agenda } from '../entities/agenda.entity'

interface IAgendaService {
  getAgendaByVeterinario: (vetId: number) => Promise<Agenda[]>
}

export class GetAgendaUseCase {
  constructor(private readonly service: IAgendaService) {}

  async execute(vetId: number): Promise<Agenda[]> {
    return await this.service.getAgendaByVeterinario(vetId)
  }
}