import { Cita } from '../entities/cita.entity'

export interface ICitaRepository {
  getCitasRecientes(): Promise<Cita[]>
}