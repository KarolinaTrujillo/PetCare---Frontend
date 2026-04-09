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

      const user = JSON.parse(localStorage.getItem('user') ?? '{}')
      const fecha = new Date(data.fecha)

      fetch(`${process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL}/api/notifications/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to:   user.email,
          type: 'CITA_AGENDADA',
          data: {
            nombre:   `${(user.nombre ?? '').trim()} ${(user.apellido ?? '').trim()}`.trim(),
            fecha:    fecha.toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' }),
            hora:     fecha.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
            servicio: 'Consulta en PetCare',
          }
        })
      }).catch(() => {})

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