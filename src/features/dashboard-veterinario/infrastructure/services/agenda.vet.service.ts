import { httpClient } from '@/src/core/lib/http/http-client'
import { AgendaVet } from '../../domain/entities/agenda.vet.entity'
import { CreateAgendaVetRequest } from '../../domain/dtos/request/create-agenda-vet.request'

export const agendaVetService = {
  getAgenda: async (vetId: number): Promise<AgendaVet[]> => {
    const { data } = await httpClient.get(`/agenda/veterinario/${vetId}`)
    return Array.isArray(data) ? data : data.data ?? []
  },

  createAgenda: async (payload: CreateAgendaVetRequest): Promise<AgendaVet> => {
    const { data } = await httpClient.post<{ success: boolean; data: AgendaVet }>('/agenda', payload)
    return data.data
  },

  updateStatus: async (id: number, estado: string): Promise<void> => {
    await httpClient.put(`/agenda/${id}/status`, { estado })
  },

  deleteAgenda: async (id: number): Promise<void> => {
    await httpClient.delete(`/agenda/${id}`)
  },

  deleteAgendaByVeterinario: async (vetId: number): Promise<void> => {
    await httpClient.delete(`/agenda/veterinario/${vetId}`)
  },
}