import type { EstadoCitaVet } from '../../domain/entities/cita.vet.entity'

export type { EstadoCitaVet }

export interface CitaVetProps {
  id:                    number
  id_mascota:            number
  nombre_mascota:        string
  nombre_dueno:          string
  apellido_dueno:        string
  email_dueno?:          string | null
  telefono_dueno?:       string | null
  hora:                  string
  fecha:                 string
  nombre_servicio:       string
  precio_servicio?:      string | null
  nombre_veterinario?:   string | null
  apellido_veterinario?: string | null
  especialidad?:         string | null
  estado:                EstadoCitaVet
  observaciones_cliente?: string | null
}