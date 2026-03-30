import { useState, useCallback } from 'react'
import { historialVetService } from '../../infrastructure/services/historial.vet.service'
import { GetHistorialVetUseCase } from '../../domain/usecases/historial/get-historial-vet.usecase'
import { CreateHistorialVetUseCase } from '../../domain/usecases/historial/create-historial-vet.usecase'
import { HistorialVet } from '../../domain/entities/historial.vet.entity'
import { CreateHistorialVetRequest } from '../../domain/dtos/request/create-historial-vet.request'
import { getUsuarioLocal } from '@/src/core/lib/auth/get-usuario-local'

const getHistorialUseCase  = new GetHistorialVetUseCase(historialVetService)
const createHistorialUseCase = new CreateHistorialVetUseCase(historialVetService)

export const useHistorialVetViewModel = (mascotaId: number) => {
  const [historial, setHistorial]   = useState<HistorialVet[]>([])
  const [isLoading, setIsLoading]   = useState(false)
  const [creating, setCreating]     = useState(false)
  const [error, setError]           = useState<string | null>(null)

  const fetchHistorial = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getHistorialUseCase.execute(mascotaId)
      setHistorial(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }, [mascotaId])

  const handleCreate = async (form: Omit<CreateHistorialVetRequest, 'id_veterinario' | 'id_mascota'>) => {
    try {
      setCreating(true)
      const usuario = getUsuarioLocal()
      if (!usuario) throw new Error('No hay sesión activa')
      const nuevo = await createHistorialUseCase.execute({
        ...form,
        id_mascota:    mascotaId,
        id_veterinario: usuario.id,
      })
      setHistorial(prev => [nuevo, ...prev])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setCreating(false)
    }
  }

  return { historial, isLoading, creating, error, fetchHistorial, handleCreate }
}