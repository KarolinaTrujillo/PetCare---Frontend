export type VeterinarioEstadoUI = "Activo" | "Inactivo";

export interface VeterinarioUI {
  id: string;
  nombre: string;
  especialidad: string;
  telefono: string;
  email: string;
  cedula: string;
  estado: VeterinarioEstadoUI;
  avatarInitials: string;
}