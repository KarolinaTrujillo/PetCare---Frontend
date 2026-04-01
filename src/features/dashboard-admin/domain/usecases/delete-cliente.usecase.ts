import { Cliente } from '../entities/cliente.entity'

interface IDeleteClienteService {
  deleteCliente: (id: number) => Promise<void>
}

export class DeleteClienteUseCase {
  constructor(private readonly service: IDeleteClienteService) {}

  async execute(cliente: Cliente): Promise<void> {
    await this.service.deleteCliente(cliente.id)
  }
}