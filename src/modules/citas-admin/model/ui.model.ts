export type CitaEstadoUI = "Confirmada" | "Cancelada";

export type ServicioUI =
  | "Chequeo médico"
  | "Limpieza dental"
  | "Control de peso"
  | "Vacunación"
  | "Cirugía"
  | "Corte de pelo y baño";

export interface CitaUI {
  id: string;
  paciente: string;
  raza: string;
  species: "dog" | "cat" | "bird" | "other";
  iniciales: string;
  propietario: string;
  servicio: ServicioUI;
  servicioSubtitulo: string;
  fecha: string;
  hora: string;
  estado: CitaEstadoUI;
}