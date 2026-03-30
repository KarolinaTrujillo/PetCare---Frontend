import { useState, useEffect } from 'react'
import { citasVetService } from '../../infrastructure/services/citas.vet.service'
import { pacientesVetService } from '../../infrastructure/services/pacientes.vet.service'
import { PacienteVet } from '../../domain/entities/paciente.vet.entity'
import { getUsuarioLocal } from '@/src/core/lib/auth/get-usuario-local'

export const usePacientesVetViewModel = () => {
  const [pacientes, setPacientes] = useState<PacienteVet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        setIsLoading(true)

        const usuario = getUsuarioLocal()
        if (!usuario) throw new Error('No hay sesión activa')

        // 1. Traer citas del vet logueado
        const todasLasCitas = await citasVetService.getCitas()
        const citasDelVet   = todasLasCitas.filter(c => c.id_veterinario === usuario.id)

        // 2. Deduplicar — un Map id_mascota → datos del dueño de esa cita
        const mascotasDueno = new Map<number, {
          id_user:        number
          nombre_dueno?:  string | null
          apellido_dueno?: string | null
          email_dueno?:   string | null
          telefono_dueno?: string | null
        }>()

        for (const cita of citasDelVet) {
          if (!mascotasDueno.has(cita.id_mascota)) {
            mascotasDueno.set(cita.id_mascota, {
              id_user:        cita.id_user,
              nombre_dueno:   cita.nombre_dueno,
              apellido_dueno: cita.apellido_dueno,
              email_dueno:    cita.email_dueno,
              telefono_dueno: cita.telefono_dueno,
            })
          }
        }

        // 3. GET /pets/:id en paralelo para obtener todos los campos de cada mascota
        const ids = Array.from(mascotasDueno.keys())

        const resultados = await Promise.all(
          ids.map(id => pacientesVetService.getPacienteById(id))
        )

        // 4. Combinar datos de la mascota + datos del dueño
        const pacientesCompletos: PacienteVet[] = resultados
          .filter((p): p is NonNullable<typeof p> => p !== null)
          .map(p => ({
            ...p,
            fecha_nacimiento: p.fecha_nacimiento
              ? String(p.fecha_nacimiento)
              : null,
            ...mascotasDueno.get(p.id),
          }))

        setPacientes(pacientesCompletos)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPacientes()
  }, [])

  return { pacientes, isLoading, error }
}