import { ClienteDTO } from "./dto";
import { ClienteUI, ClienteStatusUI } from "./ui.model";

function getIniciales(nombre: string): string {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

function mapEstado(estado: ClienteDTO["estado"]): ClienteStatusUI {
  return estado === "ACTIVO" ? "Activo" : "Inactivo";
}

export function mapClienteDTOtoUI(dto: ClienteDTO): ClienteUI {
  return {
    id: dto.id,
    nombre: dto.nombre,
    iniciales: getIniciales(dto.nombre),
    telefono: dto.telefono,
    email: dto.email,
    mascotas: dto.mascotas,
    estado: mapEstado(dto.estado),
  };
}