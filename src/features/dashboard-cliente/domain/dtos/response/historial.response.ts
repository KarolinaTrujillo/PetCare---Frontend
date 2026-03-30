import { Historial } from '../../entities/historial.entity'

export interface HistorialResponse {
  success: boolean
  data: Historial[]
}