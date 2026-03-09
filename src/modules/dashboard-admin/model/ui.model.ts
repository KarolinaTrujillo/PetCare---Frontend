export interface AppointmentUI {
  id: string;
  patientName: string;
  patientBreed: string;
  patientSpecies: "dog" | "cat" | "bird" | "other";
  ownerName: string;
  time: string;
  badgeLabel: string;
  badgeVariant: "checkup" | "grooming";
}

export interface PatientUI {
  id: string;
  name: string;
  breed: string;
  species: "dog" | "cat" | "bird" | "other";
  lastSeen: string;
}

export interface StatsUI {
  appointmentsToday: number;
  appointmentsTrend: string;
  activePatients: number;
  newPatientsThisWeek: number;
}