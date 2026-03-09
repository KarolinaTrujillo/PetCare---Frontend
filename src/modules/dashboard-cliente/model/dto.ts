export type TipoPetDTO = "PERRO" | "GATO" | "AVE" | "OTRO";
export type TipoCitaDTO = "CONSULTA" | "VACUNA" | "CIRUGIA" | "OTRO";

export interface PetDTO {
  id: string;
  nombre: string;
  tipo: TipoPetDTO;
  raza: string;
}

export interface AppointmentDTO {
  id: string;
  titulo: string;
  doctor: string;
  mes: string;
  dia: number;
  hora: string;
  tipo: TipoCitaDTO;
}

export interface ClienteDashboardDTO {
  usuarioNombre: string;
  usuarioMembresia: string;
  mascotas: PetDTO[];
  proximasCitas: AppointmentDTO[];
}