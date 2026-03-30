import { Historial } from '../entities/historial.entity'

interface IHistorialService {
  getHistorialByMascota: (mascotaId: number) => Promise<Historial[]>
}

export class GetHistorialUseCase {
  constructor(private readonly service: IHistorialService) {}

  async execute(mascotaId: number): Promise<Historial[]> {
    return await this.service.getHistorialByMascota(mascotaId)
  }
}