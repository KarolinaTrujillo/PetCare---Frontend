import { httpClient } from '@/src/core/lib/http/http-client'
import { PacienteVet } from '../../domain/entities/paciente.vet.entity'

export const pacientesVetService = {
  getPacientes: async (): Promise<PacienteVet[]> => {
    const { data } = await httpClient.get('/pets/detalle')
    return Array.isArray(data) ? data : data.data ?? []
  },

  getPacienteById: async (id: number): Promise<PacienteVet | null> => {
    const { data } = await httpClient.get(`/pets/${id}`)
    return data.data ?? data ?? null
  },
}