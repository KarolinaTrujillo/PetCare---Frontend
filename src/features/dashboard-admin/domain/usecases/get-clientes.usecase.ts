import { Cliente } from '../entities/cliente.entity'

interface IClienteService {
  getClientes: () => Promise<Cliente[]>
}

export class GetClientesUseCase {
  constructor(private readonly service: IClienteService) {}

  async execute(): Promise<Cliente[]> {
    return await this.service.getClientes()
  }
}