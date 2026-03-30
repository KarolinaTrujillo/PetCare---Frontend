export interface HistorialVet {
  id:              number
  id_mascota:      number
  id_cita:         number
  id_veterinario:  number
  fecha:           string
  diagnostico?:    string | null
  tratamiento?:    string | null
  observaciones?:  string | null
}