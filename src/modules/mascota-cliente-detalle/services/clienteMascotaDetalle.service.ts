import { MascotaDetalleDTO, HistorialDTO, VacunaDTO } from "../model/dto";

const mockMascotas: Record<string, MascotaDetalleDTO> = {
  "1": {
    id: "1",
    nombre: "Fierrolais",
    especie: "Perro",
    raza: "Golden Retriever",
    edad: 4,
    propietario: "Juan Pérez",
  },
  "2": {
    id: "2",
    nombre: "Luna",
    especie: "Gato",
    raza: "Siamés",
    edad: 2,
    propietario: "Juan Pérez",
  },
};

const mockHistorial: Record<string, HistorialDTO[]> = {
  "1": [
    {
      id: "h1",
      fecha: "2023-12-15",
      motivo: "Chequeo General Preventivo",
      observaciones:
        "Se realiza examen físico completo. El paciente presenta excelente condición corporal (3/5). Se observa dentadura limpia y encías sanas. El pelaje está brillante sin presencia de ectoparásitos. Frecuencia cardíaca y respiratoria dentro de los rangos normales.",
      veterinario: "Dr. Alejandro Ruiz",
    },
    {
      id: "h2",
      fecha: "2023-10-22",
      motivo: "Tratamiento Dermatológico",
      observaciones:
        "Consulta por prurito intenso en zona abdominal y patas. Se diagnostica dermatitis alérgica estacional. Se receta shampoo medicado y dieta hipoalergénica por 15 días. Se recomienda evitar paseos en zonas con pasto recién cortado.",
      veterinario: "Dra. Elena Martínez",
    },
    {
      id: "h3",
      fecha: "2023-08-12",
      motivo: "Desparasitación Interna y Externa",
      observaciones:
        "Aplicación de refuerzo anual contra parásitos. Se administró comprimido oral para parásitos internos y pipeta de amplio espectro. Sin reacciones adversas inmediatas. Próxima aplicación sugerida en 3 meses.",
      veterinario: "Dr. Alejandro Ruiz",
    },
  ],
  "2": [
    {
      id: "h4",
      fecha: "2023-11-05",
      motivo: "Revisión General",
      observaciones: "Control rutinario. Todo en orden.",
      veterinario: "Dra. Elena Martínez",
    },
  ],
};

const mockVacunas: Record<string, VacunaDTO[]> = {
  "1": [
    { id: "v1", nombre: "Antirrábica", fechaAplicacion: "2024-01-15" },
    { id: "v2", nombre: "Séxtuple Canina (DHPPI+L)", fechaAplicacion: "2023-12-12" },
    { id: "v3", nombre: "Bordetella", fechaAplicacion: "2023-10-10" },
    { id: "v4", nombre: "Giardia", fechaAplicacion: "2023-08-15" },
    { id: "v5", nombre: "Refuerzo Anual Polivalente", fechaAplicacion: "2023-06-20" },
  ],
  "2": [
    { id: "v6", nombre: "Triple Felina", fechaAplicacion: "2023-09-01" },
    { id: "v7", nombre: "Rabia", fechaAplicacion: "2023-09-01" },
  ],
};

export const clienteMascotaDetalleService = {
  getMascotaDetalle: (mascotaId: string): Promise<MascotaDetalleDTO | null> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(mockMascotas[mascotaId] ?? null), 400)
    ),

  getHistorialByMascotaId: (mascotaId: string): Promise<HistorialDTO[]> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(mockHistorial[mascotaId] ?? []), 400)
    ),

  getVacunasByMascotaId: (mascotaId: string): Promise<VacunaDTO[]> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(mockVacunas[mascotaId] ?? []), 400)
    ),
};
