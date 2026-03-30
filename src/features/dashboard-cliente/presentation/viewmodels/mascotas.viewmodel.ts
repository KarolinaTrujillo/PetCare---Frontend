import { useState, useEffect } from 'react'
import { dashboardClienteService } from '../../infrastructure/services/dashboard.service'
import { GetMascotasRecientesUseCase } from '../../domain/usecases/get-mascotas-recientes.usecase'
import { Mascota } from '../../domain/entities/mascota.entity'

const getMascotasUseCase = new GetMascotasRecientesUseCase(dashboardClienteService)

export const useMascotasViewModel = () => {
  const [mascotas, setMascotas] = useState<Mascota[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        setIsLoading(true)
        const data = await getMascotasUseCase.execute()
        setMascotas(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMascotas()
  }, [])

  return { mascotas, isLoading, error }
}