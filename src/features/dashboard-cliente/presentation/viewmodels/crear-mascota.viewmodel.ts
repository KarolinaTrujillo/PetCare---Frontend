import { useState } from 'react'
import { dashboardClienteService } from '../../infrastructure/services/dashboard.service'
import { CreateMascotaUseCase } from '../../domain/usecases/create-mascota.usecase'
import { CreateMascotaRequest } from '../../domain/dtos/request/create-mascota.request'
import { useAlert } from '@/src/core/hooks/useAlert'
import { getErrorMessage } from '@/src/core/lib/error-messages'

const createMascotaUseCase = new CreateMascotaUseCase(dashboardClienteService)

export const useCrearMascotaViewModel = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false)
  const { alert, hideAlert, error: showError, success } = useAlert()

  const crearMascota = async (data: CreateMascotaRequest) => {
    try {
      setIsLoading(true)
      await createMascotaUseCase.execute(data)
      success('¡Mascota agregada!', 'Tu mascota fue registrada correctamente.')
      setTimeout(() => onSuccess(), 1500)
    } catch (e: any) {
      showError('Error al agregar mascota', getErrorMessage(e))
    } finally {
      setIsLoading(false)
    }
  }

  return { crearMascota, isLoading, alert, hideAlert }
}