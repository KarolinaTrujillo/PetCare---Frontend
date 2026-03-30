import { HistorialVet } from "../../entities/historial.vet.entity"
import { CreateHistorialVetRequest } from '../../dtos/request/create-historial-vet.request'

interface IHistorialService { create: (data: CreateHistorialVetRequest) => Promise<HistorialVet> }

export class CreateHistorialVetUseCase {
  constructor(private readonly service: IHistorialService) {}
  async execute(data: CreateHistorialVetRequest): Promise<HistorialVet> {
    return await this.service.create(data)
  }
}