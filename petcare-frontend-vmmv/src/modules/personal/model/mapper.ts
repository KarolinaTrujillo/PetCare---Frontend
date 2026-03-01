import { VeterinarioDTO } from "./dto";
import { VeterinarioUI, VeterinarioEstadoUI } from "./ui.model";

function mapEstado(estado: VeterinarioDTO["estado"]): VeterinarioEstadoUI {
  return estado === "ACTIVO" ? "Activo" : "Inactivo";
}

export function mapVeterinarioDTOtoUI(dto: VeterinarioDTO): VeterinarioUI {
  return {
    id: dto.id,
    nombre: dto.nombre,
    especialidad: dto.especialidad,
    telefono: dto.telefono,
    email: dto.email,
    cedula: dto.cedula,
    estado: mapEstado(dto.estado),
    avatarInitials: dto.avatarInitials,
  };
}