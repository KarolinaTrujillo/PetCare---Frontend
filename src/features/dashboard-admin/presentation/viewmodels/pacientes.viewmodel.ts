import { useState, useEffect, useCallback } from 'react'
import { mascotasAdminService } from '../../infrastructure/services/mascotas.service'
import { GetMascotasUseCase } from '../../domain/usecases/get-mascotas.usecase'
import { MascotaAdmin } from '../../domain/entities/mascota.entity'

const getMascotasUseCase = new GetMascotasUseCase(mascotasAdminService)

export const usePacientesViewModel = () => {
  const [mascotas, setMascotas] = useState<MascotaAdmin[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMascotas = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getMascotasUseCase.execute()
      setMascotas(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { fetchMascotas() }, [fetchMascotas])

  return { mascotas, isLoading, error, refetch: fetchMascotas }
}