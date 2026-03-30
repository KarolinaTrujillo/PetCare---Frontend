import { useState, useEffect } from 'react'
import { mascotasAdminService } from '../../infrastructure/services/mascotas.service'
import { GetMascotasUseCase } from '../../domain/usecases/get-mascotas.usecase'
import { MascotaAdmin } from '../../domain/entities/mascota.entity'

const getMascotasUseCase = new GetMascotasUseCase(mascotasAdminService)

export const usePacientesViewModel = () => {
  const [mascotas, setMascotas] = useState<MascotaAdmin[]>([])
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