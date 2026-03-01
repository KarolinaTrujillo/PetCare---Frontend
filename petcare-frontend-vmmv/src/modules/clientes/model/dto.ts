export type ClienteStatusDTO = "ACTIVO" | "INACTIVO";

export interface ClienteDTO {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  mascotas: string[];
  estado: ClienteStatusDTO;
}