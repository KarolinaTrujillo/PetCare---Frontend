export type ClienteStatusUI = "Activo" | "Inactivo";

export interface ClienteUI {
  id: string;
  nombre: string;
  iniciales: string;
  telefono: string;
  email: string;
  mascotas: string[];
  estado: ClienteStatusUI;
}