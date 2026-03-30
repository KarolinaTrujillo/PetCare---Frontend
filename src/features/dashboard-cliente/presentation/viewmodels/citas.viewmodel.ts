import { useState, useEffect } from 'react'
import { dashboardClienteService } from '../../infrastructure/services/dashboard.service'
import { GetCitasRecientesUseCase } from '../../domain/usecases/get-citas-recientes.usecase'
import { Cita } from '../../domain/entities/cita.entity'

const getCitasUseCase = new GetCitasRecientesUseCase(dashboardClienteService)

export const useCitasViewModel = () => {
  const [citas, setCitas] = useState<Cita[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        setIsLoading(true)
        const data = await getCitasUseCase.execute()
        setCitas(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCitas()
  }, [])

  return { citas, isLoading, error }
}