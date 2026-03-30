import { useState, useEffect } from 'react'
import { personalService } from '../../infrastructure/services/personal.service'
import { GetPersonalUseCase } from '../../domain/usecases/get-personal.usecase'
import { Personal } from '../../domain/entities/personal.entity'

const getPersonalUseCase = new GetPersonalUseCase(personalService)

export const usePersonalViewModel = () => {
  const [personal, setPersonal] = useState<Personal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPersonal = async () => {
    try {
      setIsLoading(true)
      const data = await getPersonalUseCase.execute()
      setPersonal(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchPersonal() }, [])

  return { personal, isLoading, error, refetch: fetchPersonal }
}