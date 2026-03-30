import { useState, useEffect } from 'react'
import { dashboardClienteService } from '../../infrastructure/services/dashboard.service'
import { historialService } from '../../infrastructure/services/historial.service'
import { GetHistorialUseCase } from '../../domain/usecases/get-historial.usecase'
import { Mascota } from '../../domain/entities/mascota.entity'
import { Historial } from '../../domain/entities/historial.entity'

const getHistorialUseCase = new GetHistorialUseCase(historialService)

export const useMascotaDetalleViewModel = (mascotaId: number) => {
  const [mascota, setMascota] = useState<Mascota | null>(null)
  const [historial, setHistorial] = useState<Historial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [mascotas, historialData] = await Promise.all([
          dashboardClienteService.getMascotasRecientes(),
          getHistorialUseCase.execute(mascotaId),
        ])
        const found = mascotas.find(m => m.id === mascotaId || m.id_mascota === mascotaId) ?? null
        setMascota(found)
        setHistorial(historialData)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [mascotaId])

  return { mascota, historial, isLoading, error }
}