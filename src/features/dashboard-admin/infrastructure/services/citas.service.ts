import { httpClient } from '@/src/core/lib/http/http-client'
import { Cita } from '../../domain/entities/cita.entity'

export const citasAdminService = {
  getCitas: async (): Promise<Cita[]> => {
    const { data } = await httpClient.get('/citas/detalle')
    const lista = Array.isArray(data) ? data : data.data ?? []
    return lista.map((c: any) => ({
      ...c,
      id: c.id_cita,
      fecha: c.fecha_cita,
      estado: c.estado_cita,
      mascota: c.mascota,
      dueno: c.dueno,
      veterinario: c.veterinario,
      servicio: c.servicio,
      precio: c.precio,
      especialidad: c.especialidad,
      observaciones_cliente: c.observaciones_cliente,
    }))
  },
}