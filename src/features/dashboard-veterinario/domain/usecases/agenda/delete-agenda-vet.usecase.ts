interface IAgendaService { deleteAgenda: (id: number) => Promise<void> }

export class DeleteAgendaVetUseCase {
  constructor(private readonly service: IAgendaService) {}
  async execute(id: number): Promise<void> {
    return await this.service.deleteAgenda(id)
  }
}