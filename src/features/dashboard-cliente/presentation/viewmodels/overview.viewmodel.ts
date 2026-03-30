import { useState, useEffect } from 'react'
import { dashboardClienteService } from '../../infrastructure/services/dashboard.service'
import { GetCitasRecientesUseCase } from '../../domain/usecases/get-citas-recientes.usecase'
import { GetMascotasRecientesUseCase } from '../../domain/usecases/get-mascotas-recientes.usecase'
import { Cita } from '../../domain/entities/cita.entity'
import { Mascota } from '../../domain/entities/mascota.entity'

const getCitasUseCase = new GetCitasRecientesUseCase(dashboardClienteService)
const getMascotasUseCase = new GetMascotasRecientesUseCase(dashboardClienteService)

export const useOverviewViewModel = () => {
  const [citas, setCitas] = useState<Cita[]>([])
  const [mascotas, setMascotas] = useState<Mascota[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [citasData, mascotasData] = await Promise.all([
          getCitasUseCase.execute(),
          getMascotasUseCase.execute(),
        ])
        setCitas(citasData)
        setMascotas(mascotasData)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { citas, mascotas, isLoading, error }
}