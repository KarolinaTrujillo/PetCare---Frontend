import { httpClient } from '@/src/core/lib/http/http-client'
import { Personal } from '../../domain/entities/personal.entity'

export const personalService = {
  getVeterinarios: async (): Promise<Personal[]> => {
    const { data } = await httpClient.get('/veterinarios/listar')
    const lista = Array.isArray(data) ? data : data.data ?? []
    return lista.map((v: any) => ({ ...v, rol: 'VETERINARIO' }))
  },

  getAdmins: async (): Promise<Personal[]> => {
    const { data } = await httpClient.get('/auth/users/admins')
    const lista = Array.isArray(data) ? data : data.data ?? []
    return lista.map((a: any) => ({ ...a, rol: 'ADMIN' }))
  },

  crearVeterinario: async (payload: any): Promise<void> => {
    await httpClient.post('/veterinarios/registrar', payload)
  },

  crearAdmin: async (payload: any): Promise<void> => {
    await httpClient.post('/auth/register', payload)
  },
}