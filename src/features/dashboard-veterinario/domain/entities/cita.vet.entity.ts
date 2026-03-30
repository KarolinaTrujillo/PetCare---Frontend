export type EstadoCitaVet = 'PENDIENTE' | 'CONFIRMADA' | 'ATENDIDA' | 'CANCELADA'

export interface CitaVet {
  id:                    number
  id_user:               number
  id_mascota:            number
  id_servicio:           number
  id_veterinario?:       number | null
  id_agenda?:            number | null
  fecha:                 string
  estado:                EstadoCitaVet
  observaciones_cliente?: string | null
  nombre_mascota?:        string
  nombre_dueno?:          string
  apellido_dueno?:        string
  email_dueno?:           string
  telefono_dueno?:        string
  nombre_veterinario?:    string
  apellido_veterinario?:  string
  especialidad?:          string
  nombre_servicio?:       string
  precio_servicio?:       string
  created_at?:            string
  updated_at?:            string
}