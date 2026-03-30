interface IAgendaService { updateStatus: (id: number, estado: string) => Promise<void> }

export class UpdateAgendaStatusUseCase {
  constructor(private readonly service: IAgendaService) {}
  async execute(id: number, estado: string): Promise<void> {
    return await this.service.updateStatus(id, estado)
  }
}