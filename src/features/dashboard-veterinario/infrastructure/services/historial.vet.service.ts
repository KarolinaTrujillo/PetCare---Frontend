import { httpClient } from '@/src/core/lib/http/http-client'
import { HistorialVet } from '../../domain/entities/historial.vet.entity'
import { CreateHistorialVetRequest } from '../../domain/dtos/request/create-historial-vet.request'

export const historialVetService = {
  getByMascota: async (mascotaId: number): Promise<HistorialVet[]> => {
    const { data } = await httpClient.get(`/historial/mascota/${mascotaId}`)
    return Array.isArray(data) ? data : data.data ?? []
  },

  create: async (payload: CreateHistorialVetRequest): Promise<HistorialVet> => {
    const { data } = await httpClient.post<{ success: boolean; data: HistorialVet }>('/historial', payload)
    return data.data
  },
}