import { useState, useEffect } from 'react'
import { citasAdminService } from '../../infrastructure/services/citas.service'
import { GetCitasUseCase } from '../../domain/usecases/get-citas.usecase'
import { Cita } from '../../domain/entities/cita.entity'

const getCitasUseCase = new GetCitasUseCase(citasAdminService)

export const useCitasAdminViewModel = () => {
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