import { ClienteDashboardDTO } from "../model/dto";

const mockData: ClienteDashboardDTO = {
  usuarioNombre: "Juan Pérez",
  usuarioMembresia: "Premium Member",
  mascotas: [
    { id: "pet-001", nombre: "Firulais", tipo: "PERRO", raza: "Labrador" },
    { id: "pet-002", nombre: "Luna",     tipo: "GATO",  raza: "Siamés"  },
  ],
  proximasCitas: [
    {
      id: "apt-001",
      titulo: "Consulta General",
      doctor: "Dr. Ricardo Méndez",
      mes: "NOV",
      dia: 24,
      hora: "10:30 AM",
      tipo: "CONSULTA",
    },
    {
      id: "apt-002",
      titulo: "Vacunación Anual",
      doctor: "Dra. Elena Soler",
      mes: "DIC",
      dia: 2,
      hora: "04:00 PM",
      tipo: "VACUNA",
    },
  ],
};

export const clienteDashboardService = {
  getDashboard: (): Promise<ClienteDashboardDTO> =>
    new Promise((resolve) => setTimeout(() => resolve(mockData), 600)),
};