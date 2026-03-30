import { useState, useEffect } from 'react'
import { citasAdminService } from '../../infrastructure/services/citas.service'
import { clientesService } from '../../infrastructure/services/clientes.service'
import { personalService } from '../../infrastructure/services/personal.service'

export const useAnalisisViewModel = () => {
  const [citas, setCitas] = useState<any[]>([])
  const [totalClientes, setTotalClientes] = useState(0)
  const [totalVeterinarios, setTotalVeterinarios] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [citasData, clientesData, vetsData] = await Promise.all([
          citasAdminService.getCitas(),
          clientesService.getClientes(),
          personalService.getVeterinarios(),
        ])
        setCitas(citasData)
        setTotalClientes(clientesData.length)
        setTotalVeterinarios(vetsData.length)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const citasPorEstado = ['PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA', 'ATENDIDA'].map(estado => ({
    name: estado,
    value: citas.filter(c => c.estado === estado).length,
  })).filter(d => d.value > 0)

  const citasPorMes = citas.reduce((acc: any, c) => {
    if (!c.fecha) return acc
    const mes = new Date(c.fecha).toLocaleDateString('es-MX', { month: 'short', year: '2-digit' })
    acc[mes] = (acc[mes] ?? 0) + 1
    return acc
  }, {})

  const citasPorMesData = Object.entries(citasPorMes).map(([mes, total]) => ({ mes, total }))

  const serviciosCount = citas.reduce((acc: any, c) => {
    if (!c.servicio) return acc
    acc[c.servicio] = (acc[c.servicio] ?? 0) + 1
    return acc
  }, {})

  const serviciosData = Object.entries(serviciosCount)
    .map(([nombre, total]) => ({ nombre, total }))
    .sort((a: any, b: any) => b.total - a.total)
    .slice(0, 5)

  return {
    citas,
    totalClientes,
    totalVeterinarios,
    citasPorEstado,
    citasPorMesData,
    serviciosData,
    isLoading,
    error,
  }
}