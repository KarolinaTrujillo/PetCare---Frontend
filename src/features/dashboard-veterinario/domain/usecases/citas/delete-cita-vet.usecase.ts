interface ICitasVetService {
  deleteCita: (id: number) => Promise<void>
}

export class DeleteCitaVetUseCase {
  constructor(private readonly service: ICitasVetService) {}

  async execute(id: number): Promise<void> {
    return await this.service.deleteCita(id)
  }
}