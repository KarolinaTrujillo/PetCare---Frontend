export interface PacienteVetProps {
  id:               number
  id_user:          number
  nombre:           string
  especie:          string
  raza:             string | null
  fecha_nacimiento: string | null
  sexo:             string | null
  peso:             number | null
  activo:           boolean
  nombre_dueno?:    string | null
  apellido_dueno?:  string | null
  email_dueno?:     string | null
  telefono_dueno?:  string | null
}