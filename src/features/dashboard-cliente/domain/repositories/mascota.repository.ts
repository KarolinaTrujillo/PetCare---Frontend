import { Mascota } from '../entities/mascota.entity'

export interface IMascotaRepository {
  getMascotasRecientes(): Promise<Mascota[]>
}