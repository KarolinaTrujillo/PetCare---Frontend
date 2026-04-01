import { useState, useEffect } from 'react'
import { personalService } from '../../infrastructure/services/personal.service'
import { GetPersonalUseCase } from '../../domain/usecases/get-personal.usecase'
import { DeletePersonalUseCase } from '../../domain/usecases/delete-personal.usecase'
import { Personal } from '../../domain/entities/personal.entity'

const getPersonalUseCase    = new GetPersonalUseCase(personalService)
const deletePersonalUseCase = new DeletePersonalUseCase(personalService)

export const usePersonalViewModel = () => {
  const [personal, setPersonal]   = useState<Personal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const deletePersonal = async (p: Personal) => {
    try {
      setIsDeleting(true)
      await deletePersonalUseCase.execute(p)
      await fetchPersonal()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsDeleting(false)
    }
  }

  useEffect(() => { fetchPersonal() }, [])

  return { personal, isLoading, error, isDeleting, refetch: fetchPersonal, deletePersonal }
}