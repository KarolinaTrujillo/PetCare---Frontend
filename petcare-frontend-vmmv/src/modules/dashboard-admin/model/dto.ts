export interface AppointmentDTO {
  id: string;
  patientName: string;
  patientBreed: string;
  ownerName: string;
  time: string;
  type: "checkup" | "grooming" | "vaccination" | "surgery";
}

export interface PatientDTO {
  id: string;
  name: string;
  breed: string;
  species: "dog" | "cat" | "bird" | "other";
  lastSeenAt: string; // ISO or relative string
}

export interface DashboardStatsDTO {
  appointmentsToday: number;
  appointmentsTrend: string;
  activePatients: number;
  newPatientsThisWeek: number;
}