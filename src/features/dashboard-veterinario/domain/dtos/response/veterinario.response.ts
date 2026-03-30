import { Veterinario } from '../../entities/veterinario.entity'

export interface VeterinarioResponse {
  success: boolean
  data: Veterinario
}