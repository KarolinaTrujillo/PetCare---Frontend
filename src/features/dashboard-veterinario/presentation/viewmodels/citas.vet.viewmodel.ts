import { useState, useEffect, useCallback } from 'react'
import { citasVetService } from '../../infrastructure/services/citas.vet.service'
import { GetCitasVetUseCase } from '../../domain/usecases/citas/get-citas-vet.usecase'
import { UpdateCitaStatusUseCase } from '../../domain/usecases/citas/update-cita-status.usecase'
import { CreateCitaVetUseCase } from '../../domain/usecases/citas/create-cita-vet.usecase'
import { DeleteCitaVetUseCase } from '../../domain/usecases/citas/delete-cita-vet.usecase'
import { CitaVet, EstadoCitaVet } from '../../domain/entities/cita.vet.entity'
import { CreateCitaVetRequest } from '../../domain/dtos/request/create-cita-vet.request'
import { CitaVetProps } from '../types/cita.vet.types'
import { getUsuarioLocal } from '@/src/core/lib/auth/get-usuario-local'

const getCitasUseCase     = new GetCitasVetUseCase(citasVetService)
const updateStatusUseCase = new UpdateCitaStatusUseCase(citasVetService)
const createCitaUseCase   = new CreateCitaVetUseCase(citasVetService)
const deleteCitaUseCase   = new DeleteCitaVetUseCase(citasVetService)

export const mapToCitaVetProps = (c: CitaVet): CitaVetProps => ({
  id:                    c.id,
  id_mascota:            c.id_mascota,
  nombre_mascota:        c.nombre_mascota        ?? '—',
  nombre_dueno:          c.nombre_dueno          ?? '—',
  apellido_dueno:        c.apellido_dueno        ?? '',
  email_dueno:           c.email_dueno,
  telefono_dueno:        c.telefono_dueno,
  hora: c.fecha
    ? new Date(c.fecha).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    : '—',
  fecha:                 c.fecha ?? '',
  nombre_servicio:       c.nombre_servicio       ?? '—',
  precio_servicio:       c.precio_servicio,
  nombre_veterinario:    c.nombre_veterinario,
  apellido_veterinario:  c.apellido_veterinario,
  especialidad:          c.especialidad,
  estado:                c.estado,
  observaciones_cliente: c.observaciones_cliente,
})

export const useCitasVetViewModel = () => {
  const [citas, setCitas]           = useState<CitaVetProps[]>([])
  const [isLoading, setIsLoading]   = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [creating, setCreating]     = useState(false)

  const fetchCitas = useCallback(async () => {
    try {
      setIsLoading(true)

      const usuario = getUsuarioLocal()
      if (!usuario) throw new Error('No hay sesión activa')

      const data = await getCitasUseCase.execute()

      // Filtrar solo las citas que pertenecen al veterinario logueado
      const citasDelVet = data.filter(c => c.id_veterinario === usuario.id)

      setCitas(citasDelVet.map(mapToCitaVetProps))
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { fetchCitas() }, [fetchCitas])

  const handleUpdateStatus = async (id: number, estado: EstadoCitaVet) => {
    try {
      setUpdatingId(id)
      await updateStatusUseCase.execute(id, estado)
      setCitas(prev => prev.map(c => c.id === id ? { ...c, estado } : c))
    } catch (e: any) {
      setError(e.message)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleCreateCita = async (data: CreateCitaVetRequest) => {
    try {
      setCreating(true)
      const nueva = await createCitaUseCase.execute(data)
      // Solo agregar si la cita nueva pertenece al vet logueado
      const usuario = getUsuarioLocal()
      if (nueva.id_veterinario === usuario?.id) {
        setCitas(prev => [mapToCitaVetProps(nueva), ...prev])
      }
    } catch (e: any) {
      setError(e.message)
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteCita = async (id: number) => {
    try {
      setDeletingId(id)
      await deleteCitaUseCase.execute(id)
      setCitas(prev => prev.filter(c => c.id !== id))
    } catch (e: any) {
      setError(e.message)
    } finally {
      setDeletingId(null)
    }
  }

  return {
    citas, isLoading, error,
    updatingId, handleUpdateStatus,
    deletingId, handleDeleteCita,
    creating, handleCreateCita,
  }
}