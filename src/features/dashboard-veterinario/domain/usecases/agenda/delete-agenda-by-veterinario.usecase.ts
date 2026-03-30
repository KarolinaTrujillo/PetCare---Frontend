interface IAgendaService { deleteAgendaByVeterinario: (vetId: number) => Promise<void> }

export class DeleteAgendaByVeterinarioUseCase {
  constructor(private readonly service: IAgendaService) {}
  async execute(vetId: number): Promise<void> {
    return await this.service.deleteAgendaByVeterinario(vetId)
  }
}