import { ClienteDashboardDTO, PetDTO, AppointmentDTO, TipoPetDTO, TipoCitaDTO } from "./dto";
import { ClienteDashboardUI, PetUI, AppointmentUI, TipoPetUI, TipoCitaUI } from "./ui.model";

const tipoPetMap: Record<TipoPetDTO, TipoPetUI> = {
  PERRO: "perro",
  GATO: "gato",
  AVE: "ave",
  OTRO: "otro",
};

const tipoCitaMap: Record<TipoCitaDTO, TipoCitaUI> = {
  CONSULTA: "consulta",
  VACUNA: "vacuna",
  CIRUGIA: "cirugia",
  OTRO: "otro",
};

function buildInitials(nombre: string): string {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

function mapPetDTOtoUI(dto: PetDTO): PetUI {
  return {
    id: dto.id,
    nombre: dto.nombre,
    tipo: tipoPetMap[dto.tipo],
    raza: dto.raza,
  };
}

function mapAppointmentDTOtoUI(dto: AppointmentDTO): AppointmentUI {
  return {
    id: dto.id,
    titulo: dto.titulo,
    doctor: dto.doctor,
    mes: dto.mes,
    dia: dto.dia,
    hora: dto.hora,
    tipo: tipoCitaMap[dto.tipo],
  };
}

export function mapClienteDashboardDTOtoUI(dto: ClienteDashboardDTO): ClienteDashboardUI {
  return {
    usuarioNombre: dto.usuarioNombre,
    usuarioMembresia: dto.usuarioMembresia,
    usuarioInitials: buildInitials(dto.usuarioNombre),
    mascotas: dto.mascotas.map(mapPetDTOtoUI),
    proximasCitas: dto.proximasCitas.map(mapAppointmentDTOtoUI),
  };
}