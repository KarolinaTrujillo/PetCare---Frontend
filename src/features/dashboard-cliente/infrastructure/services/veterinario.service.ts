import { httpClient } from '@/src/core/lib/http/http-client'
import { Veterinario } from '../../domain/entities/veterinario.entity'
import { Agenda } from '../../domain/entities/agenda.entity'

export const veterinarioService = {
  getVeterinarios: async (): Promise<Veterinario[]> => {
    const { data } = await httpClient.get('/veterinarios/listar')
    return Array.isArray(data) ? data : data.data ?? []
  },

  getAgendaByVeterinario: async (vetId: number): Promise<Agenda[]> => {
    const { data } = await httpClient.get(`/agenda/veterinario/${vetId}`)
    const lista = Array.isArray(data) ? data : data.data ?? []
    return lista.filter((a: Agenda) => a.estado === 'disponible')
  },
}