export type { EstadoAgenda, DiaSemana } from '../../domain/entities/agenda.vet.entity'

export interface AgendaVetProps {
  id:          number
  fecha:       string
  dia_nombre:  string
  hora_inicio: string
  hora_fin:    string
  estado:      string
}