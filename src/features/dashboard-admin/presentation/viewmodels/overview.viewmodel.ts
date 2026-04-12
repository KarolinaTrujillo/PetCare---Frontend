import { useState, useEffect } from 'react'
import { citasAdminService } from '../../infrastructure/services/citas.service'
import { clientesService } from '../../infrastructure/services/clientes.service'
import { mascotasAdminService } from '../../infrastructure/services/mascotas.service'
import { personalService } from '../../infrastructure/services/personal.service'
import { CitaAdminProps } from '../types/cita.admin.types'
import { ClienteAdminProps } from '../types/cliente.admin.types'

export const useOverviewAdminViewModel = () => {
  const [citas, setCitas] = useState<CitaAdminProps[]>([])
  const [clientes, setClientes] = useState<ClienteAdminProps[]>([])
  const [totalClientes, setTotalClientes] = useState(0)
  const [totalMascotas, setTotalMascotas] = useState(0)
  const [totalPersonal, setTotalPersonal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [citasData, clientesData, mascotasData, vetsData] = await Promise.all([
          citasAdminService.getCitas(),
          clientesService.getClientes(),
          mascotasAdminService.getMascotas(),
          personalService.getVeterinarios(),
        ])

        const citasMapeadas: CitaAdminProps[] = citasData
          .sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
          .slice(0, 5)
          .map((c: any) => ({
            id: c.id,
            nombre_mascota: c.mascota ?? '—',
            nombre_dueno: c.dueno?.split(' ')[0] ?? '—',
            apellido_dueno: c.dueno?.split(' ')[1] ?? '',
            nombre_veterinario: c.veterinario?.split(' ')[0] ?? '—',
            apellido_veterinario: c.veterinario?.split(' ')[1] ?? '',
            nombre_servicio: c.servicio ?? '—',
            fecha: c.fecha ?? '',
            estado: c.estado ?? 'PENDIENTE',
          }))

        const clientesMapeados: ClienteAdminProps[] = clientesData
          .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)
          .map((c: any) => ({
            id: c.id_user ?? c.id,
            nombre: c.nombre,
            apellido: c.apellido,
            email: c.email,
            telefono: c.telefono ?? '—',
          }))

        setCitas(citasMapeadas)
        setClientes(clientesMapeados)
        setTotalClientes(clientesData.length)
        setTotalMascotas(mascotasData.length)
        setTotalPersonal(vetsData.length)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return { citas, clientes, totalClientes, totalMascotas, totalPersonal, isLoading, error }
}