import { httpClient } from '@/src/core/lib/http/http-client'
import { CitaVet, EstadoCitaVet } from '../../domain/entities/cita.vet.entity'
import { CreateCitaVetRequest } from '../../domain/dtos/request/create-cita-vet.request'

export const citasVetService = {
  getCitas: async (): Promise<CitaVet[]> => {
    const { data } = await httpClient.get('/citas')
    return Array.isArray(data) ? data : data.data ?? []
  },

  updateStatus: async (id: number, estado: EstadoCitaVet): Promise<void> => {
    await httpClient.put(`/citas/${id}/status`, { estado })
  },

  createCita: async (payload: CreateCitaVetRequest): Promise<CitaVet> => {
    const { data } = await httpClient.post<{ success: boolean; data: CitaVet }>('/citas', payload)
    return data.data
  },

  deleteCita: async (id: number): Promise<void> => {
    await httpClient.delete(`/citas/${id}`)
  },
}