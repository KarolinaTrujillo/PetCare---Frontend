import { useState, useEffect, useCallback } from 'react'
import { agendaVetService } from '../../infrastructure/services/agenda.vet.service'
import { GetAgendaVetUseCase } from '../../domain/usecases/agenda/get-agenda-vet.usecase'
import { CreateAgendaVetUseCase } from '../../domain/usecases/agenda/create-agenda-vet.usecase'
import { UpdateAgendaStatusUseCase } from '../../domain/usecases/agenda/update-agenda-status.usecase'
import { DeleteAgendaVetUseCase } from '../../domain/usecases/agenda/delete-agenda-vet.usecase'
import { DeleteAgendaByVeterinarioUseCase } from '../../domain/usecases/agenda/delete-agenda-by-veterinario.usecase'
import { AgendaVet } from '../../domain/entities/agenda.vet.entity'
import { CreateAgendaVetRequest } from '../../domain/dtos/request/create-agenda-vet.request'
import { AgendaVetProps } from '../types/agenda.vet.types'
import { getUsuarioLocal } from '@/src/core/lib/auth/get-usuario-local'

const getAgendaUseCase               = new GetAgendaVetUseCase(agendaVetService)
const createAgendaUseCase            = new CreateAgendaVetUseCase(agendaVetService)
const updateStatusUseCase            = new UpdateAgendaStatusUseCase(agendaVetService)
const deleteAgendaUseCase            = new DeleteAgendaVetUseCase(agendaVetService)
const deleteByVeterinarioUseCase     = new DeleteAgendaByVeterinarioUseCase(agendaVetService)

const mapToProps = (a: AgendaVet): AgendaVetProps => ({
  id:          a.id,
  fecha:       a.fecha,
  dia_nombre:  a.dia_nombre,
  hora_inicio: a.hora_inicio,
  hora_fin:    a.hora_fin,
  estado:      a.estado,
})

export const useAgendaVetViewModel = () => {
  const [agenda, setAgenda]         = useState<AgendaVetProps[]>([])
  const [isLoading, setIsLoading]   = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [creating, setCreating]     = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const fetchAgenda = useCallback(async () => {
    try {
      setIsLoading(true)
      const usuario = getUsuarioLocal()
      if (!usuario) throw new Error('No hay sesión activa')
      const data = await getAgendaUseCase.execute(usuario.id)
      setAgenda(data.map(mapToProps))
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { fetchAgenda() }, [fetchAgenda])

  const handleCreate = async (data: Omit<CreateAgendaVetRequest, 'veterinario_id'>) => {
    try {
      setCreating(true)
      const usuario = getUsuarioLocal()
      if (!usuario) throw new Error('No hay sesión activa')
      const nueva = await createAgendaUseCase.execute({ ...data, veterinario_id: usuario.id })
      setAgenda(prev => [...prev, mapToProps(nueva)])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setCreating(false)
    }
  }

  const handleUpdateStatus = async (id: number, estado: string) => {
    try {
      setUpdatingId(id)
      await updateStatusUseCase.execute(id, estado)
      setAgenda(prev => prev.map(a => a.id === id ? { ...a, estado } : a))
    } catch (e: any) {
      setError(e.message)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id)
      await deleteAgendaUseCase.execute(id)
      setAgenda(prev => prev.filter(a => a.id !== id))
    } catch (e: any) {
      setError(e.message)
    } finally {
      setDeletingId(null)
    }
  }

  const handleDeleteToda = async () => {
    try {
      setIsLoading(true)
      const usuario = getUsuarioLocal()
      if (!usuario) throw new Error('No hay sesión activa')
      await deleteByVeterinarioUseCase.execute(usuario.id)
      setAgenda([])
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    agenda, isLoading, error,
    creating,   handleCreate,
    updatingId, handleUpdateStatus,
    deletingId, handleDelete,
    handleDeleteToda,
  }
}