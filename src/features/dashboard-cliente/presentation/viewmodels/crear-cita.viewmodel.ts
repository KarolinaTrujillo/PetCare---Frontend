import { useState } from 'react'
import { dashboardClienteService } from '../../infrastructure/services/dashboard.service'
import { CreateCitaUseCase } from '../../domain/usecases/create-cita.usecase'
import { CreateCitaRequest } from '../../domain/dtos/request/create-cita.request'
import { useAlert } from '@/src/core/hooks/useAlert'
import { getErrorMessage } from '@/src/core/lib/error-messages'

const createCitaUseCase = new CreateCitaUseCase(dashboardClienteService)

export const useCrearCitaViewModel = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false)
  const { alert, hideAlert, error: showError, success } = useAlert()

  const crearCita = async (data: CreateCitaRequest) => {
    try {
      setIsLoading(true)
      await createCitaUseCase.execute(data)
      success('¡Cita agendada!', 'Tu cita fue registrada correctamente.')
      setTimeout(() => onSuccess(), 1500)
    } catch (e: any) {
      showError('Error al agendar cita', getErrorMessage(e))
    } finally {
      setIsLoading(false)
    }
  }

  return { crearCita, isLoading, alert, hideAlert }
}