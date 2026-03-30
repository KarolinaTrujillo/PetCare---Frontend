import { httpClient } from '@/src/core/lib/http/http-client'
import { Cliente } from '../../domain/entities/cliente.entity'

export const clientesService = {
  getClientes: async (): Promise<Cliente[]> => {
    const { data } = await httpClient.get('/clients')
    const lista = Array.isArray(data) ? data : data.data ?? []
    return lista.filter((c: any) => c.rol === 'USER' || c.rol === 'CLIENTE' || !c.rol)
  },
}