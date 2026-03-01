import { CitaDTO, ServicioDTO, CitaEstadoDTO } from "./dto";
import { CitaUI, CitaEstadoUI, ServicioUI } from "./ui.model";

const servicioLabelMap: Record<ServicioDTO, ServicioUI> = {
  CHEQUEO_MEDICO: "Chequeo médico",
  LIMPIEZA_DENTAL: "Limpieza dental",
  CONTROL_PESO: "Control de peso",
  VACUNACION: "Vacunación",
  CIRUGIA: "Cirugía",
};

const servicioSubtituloMap: Record<ServicioDTO, string> = {
  CHEQUEO_MEDICO: "Revisión general",
  LIMPIEZA_DENTAL: "Higiene bucal",
  CONTROL_PESO: "Seguimiento nutricional",
  VACUNACION: "Inmunización anual",
  CIRUGIA: "Procedimiento quirúrgico",
};

function mapEstado(estado: CitaEstadoDTO): CitaEstadoUI {
  return estado === "CONFIRMADA" ? "Confirmada" : "Cancelada";
}

function getIniciales(nombre: string): string {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

export function mapCitaDTOtoUI(dto: CitaDTO): CitaUI {
  return {
    id: dto.id,
    paciente: dto.paciente,
    raza: dto.raza,
    iniciales: getIniciales(dto.paciente),
    propietario: dto.propietario,
    servicio: servicioLabelMap[dto.servicio],
    servicioSubtitulo: servicioSubtituloMap[dto.servicio],
    fecha: dto.fecha,
    hora: dto.hora,
    estado: mapEstado(dto.estado),
  };
}