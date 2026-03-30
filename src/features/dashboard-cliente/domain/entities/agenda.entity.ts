export type EstadoAgenda = 'disponible' | 'reservado' | 'cancelado'
export type DiaSemana = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'

export interface Agenda {
  id: number
  veterinario_id: number
  fecha: string
  dia_nombre: DiaSemana
  hora_inicio: string
  hora_fin: string
  estado: EstadoAgenda
}