import { AppointmentDTO, PatientDTO, DashboardStatsDTO } from "../model/dto";

const mockStats: DashboardStatsDTO = {
  appointmentsToday: 12,
  appointmentsTrend: "+15% más que ayer",
  activePatients: 48,
  newPatientsThisWeek: 8,
};

const mockAppointments: AppointmentDTO[] = [
  {
    id: "apt-1",
    patientName: "Buddy",
    patientBreed: "Golden Retriever",
    ownerName: "Sarah Jenkins",
    time: "09:30 AM",
    type: "checkup",
  },
  {
    id: "apt-2",
    patientName: "Luna",
    patientBreed: "Siamese Cat",
    ownerName: "Mark Thompson",
    time: "11:15 AM",
    type: "grooming",
  },
  {
    id: "apt-3",
    patientName: "Max",
    patientBreed: "Labrador",
    ownerName: "Emily Carter",
    time: "01:00 PM",
    type: "vaccination",
  },
];

const mockRecentPatients: PatientDTO[] = [
  {
    id: "pat-1",
    name: "Maximus",
    breed: "Beagle",
    species: "dog",
    lastSeenAt: "Seen 2h ago",
  },
  {
    id: "pat-2",
    name: "Misty",
    breed: "Tabby",
    species: "cat",
    lastSeenAt: "Seen 4h ago",
  },
  {
    id: "pat-3",
    name: "Bella",
    breed: "Border Terrier",
    species: "dog",
    lastSeenAt: "Seen yesterday",
  },
];

export const dashboardService = {
  getStats: (): Promise<DashboardStatsDTO> =>
    Promise.resolve(mockStats),

  getUpcomingAppointments: (): Promise<AppointmentDTO[]> =>
    Promise.resolve(mockAppointments),

  getRecentPatients: (): Promise<PatientDTO[]> =>
    Promise.resolve(mockRecentPatients),
};