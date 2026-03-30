import { httpClient } from '@/src/core/lib/http/http-client'
import { MascotaAdmin } from '../../domain/entities/mascota.entity'

export const mascotasAdminService = {
  getMascotas: async (): Promise<MascotaAdmin[]> => {
    const { data } = await httpClient.get('/pets/detalle')
    const lista = Array.isArray(data) ? data : data.data ?? []
    return lista.map((m: any) => ({
      id: m.id_mascota ?? m.id,
      nombre: m.nombre,
      especie: m.especie,
      raza: m.raza ?? null,
      sexo: m.sexo ?? null,
      peso: m.peso ?? null,
      fecha_nacimiento: m.fecha_nacimiento ?? null,
      activo: m.activo,
      propietario: m.propietario ?? null,
      email_propietario: m.email_propietario ?? null,
    }))
  },
}