export interface CardMascotaProps {
  id: number
  nombre: string
  especie: 'Perro' | 'Gato'
  raza?: string | null
  fecha_nacimiento?: string | null
  sexo?: 'Macho' | 'Hembra' | null
  peso?: number | null
  activo: boolean
}