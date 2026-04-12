import { httpClient } from '@/src/core/lib/http/http-client'
import { Cita } from '../../domain/entities/cita.entity'
import { Mascota } from '../../domain/entities/mascota.entity'
import { CreateMascotaRequest } from '../../domain/dtos/request/create-mascota.request'
import { CreateCitaRequest } from '../../domain/dtos/request/create-cita.request'

export const dashboardClienteService = {
  getCitasRecientes: async (): Promise<Cita[]> => {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}')
    const { data } = await httpClient.get('/citas/detalle')
    const lista = Array.isArray(data) ? data : data.data ?? []
    return lista
      .filter((c: any) => c.id_user === user.id || c.email_dueno === user.email)
      .map((c: any) => ({
        ...c,
        id: c.id_cita,
        fecha: c.fecha_cita,
        estado: c.estado_cita,
        nombre_mascota: c.mascota,
        nombre_dueno: c.dueno?.split(' ')[0] ?? '',
        apellido_dueno: c.dueno?.split(' ')[1] ?? '',
        nombre_veterinario: c.veterinario?.split(' ')[0] ?? '',
        apellido_veterinario: c.veterinario?.split(' ')[1] ?? '',
        nombre_servicio: c.servicio,
        precio_servicio: c.precio,
      }))
  },

  getMascotasRecientes: async (): Promise<Mascota[]> => {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}')
    const { data } = await httpClient.get(`/pets/user/${user.id}`)
    const lista = Array.isArray(data) ? data : data.data ?? []
    return lista.map((m: any) => ({ ...m, id: m.id_mascota ?? m.id }))
  },

  createMascota: async (payload: CreateMascotaRequest): Promise<Mascota> => {
    const { data } = await httpClient.post<{ success: boolean; data: Mascota }>('/pets', payload)
    return data.data
  },

  createCita: async (payload: CreateCitaRequest): Promise<Cita> => {
    const { data } = await httpClient.post<{ success: boolean; data: Cita }>('/citas', payload)
    return data.data
  },

  updateMascota: async (id: number, payload: Partial<CreateMascotaRequest>): Promise<void> => {
    await httpClient.put(`/pets/${id}`, payload)
  },
}