import { IMascotaRepository } from '../../domain/repositories/mascota.repository'
import { Mascota } from '../../domain/entities/mascota.entity'
import { dashboardClienteService } from '../services/dashboard.service'

export class MascotaRepositoryImpl implements IMascotaRepository {
  async getMascotasRecientes(): Promise<Mascota[]> {
    return await dashboardClienteService.getMascotasRecientes()
  }
}