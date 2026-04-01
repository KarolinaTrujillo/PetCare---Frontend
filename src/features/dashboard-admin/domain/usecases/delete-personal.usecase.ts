import { Personal } from '../entities/personal.entity'

interface IDeletePersonalService {
  deletePersonal: (id: number, rol: string) => Promise<void>
}

export class DeletePersonalUseCase {
  constructor(private readonly service: IDeletePersonalService) {}

  async execute(personal: Personal): Promise<void> {
    await this.service.deletePersonal(personal.id, personal.rol)
  }
}