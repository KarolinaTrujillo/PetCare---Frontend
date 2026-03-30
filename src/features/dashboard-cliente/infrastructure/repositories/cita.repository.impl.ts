import { ICitaRepository } from '../../domain/repositories/cita.repository'
import { Cita } from '../../domain/entities/cita.entity'
import { dashboardClienteService } from '../services/dashboard.service'

export class CitaRepositoryImpl implements ICitaRepository {
  async getCitasRecientes(): Promise<Cita[]> {
    return await dashboardClienteService.getCitasRecientes()
  }
}