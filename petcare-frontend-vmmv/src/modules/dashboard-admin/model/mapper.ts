import { AppointmentDTO, PatientDTO, DashboardStatsDTO } from "./dto";
import { AppointmentUI, PatientUI, StatsUI } from "./ui.model";

const typeToLabel: Record<AppointmentDTO["type"], string> = {
  checkup: "CHEQUEO MÉDICO",
  grooming: "CORTE DE PELO Y BAÑO",
  vaccination: "VACUNACIÓN",
  surgery: "CIRUGÍA",
};

const typeToVariant: Record<
  AppointmentDTO["type"],
  AppointmentUI["badgeVariant"]
> = {
  checkup: "checkup",
  grooming: "grooming",
  vaccination: "checkup",
  surgery: "checkup",
};

export function mapAppointmentDTOtoUI(dto: AppointmentDTO): AppointmentUI {
  return {
    id: dto.id,
    patientName: dto.patientName,
    patientBreed: dto.patientBreed,
    patientSpecies: dto.patientSpecies,
    ownerName: dto.ownerName,
    time: dto.time,
    badgeLabel: typeToLabel[dto.type],
    badgeVariant: typeToVariant[dto.type],
  };
}

export function mapPatientDTOtoUI(dto: PatientDTO): PatientUI {
  return {
    id: dto.id,
    name: dto.name,
    breed: dto.breed,
    species: dto.species,
    lastSeen: dto.lastSeenAt,
  };
}

export function mapStatsDTOtoUI(dto: DashboardStatsDTO): StatsUI {
  return {
    appointmentsToday: dto.appointmentsToday,
    appointmentsTrend: dto.appointmentsTrend,
    activePatients: dto.activePatients,
    newPatientsThisWeek: dto.newPatientsThisWeek,
  };
}