import { HistorialVet } from "../../entities/historial.vet.entity"

interface IHistorialService { getByMascota: (mascotaId: number) => Promise<HistorialVet[]> }

export class GetHistorialVetUseCase {
  constructor(private readonly service: IHistorialService) {}
  async execute(mascotaId: number): Promise<HistorialVet[]> {
    return await this.service.getByMascota(mascotaId)
  }
}