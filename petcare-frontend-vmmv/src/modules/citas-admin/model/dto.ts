export type CitaEstadoDTO = "CONFIRMADA" | "CANCELADA";

export type ServicioDTO =
  | "CHEQUEO_MEDICO"
  | "LIMPIEZA_DENTAL"
  | "CONTROL_PESO"
  | "VACUNACION"
  | "CIRUGIA";

export interface CitaDTO {
  id: string;
  paciente: string;
  raza: string;
  propietario: string;
  servicio: ServicioDTO;
  fecha: string;
  hora: string;
  estado: CitaEstadoDTO;
}