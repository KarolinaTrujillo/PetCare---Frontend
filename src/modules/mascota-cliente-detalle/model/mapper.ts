import { MascotaDetalleDTO, HistorialDTO, VacunaDTO } from "./dto";
import { MascotaDetalleUI, HistorialUI, VacunaUI } from "./ui.model";

const MESES: Record<number, string> = {
  0: "ENE", 1: "FEB", 2: "MAR", 3: "ABR",
  4: "MAY", 5: "JUN", 6: "JUL", 7: "AGO",
  8: "SEP", 9: "OCT", 10: "NOV", 11: "DIC",
};

const MESES_LARGO: Record<number, string> = {
  0: "Ene", 1: "Feb", 2: "Mar", 3: "Abr",
  4: "May", 5: "Jun", 6: "Jul", 7: "Ago",
  8: "Sep", 9: "Oct", 10: "Nov", 11: "Dic",
};

function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatFechaHistorial(isoDate: string): string {
  const date = parseLocalDate(isoDate);
  const day = date.getDate();
  const mes = MESES[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${mes} ${year}`;
}

function formatFechaVacuna(isoDate: string): string {
  const date = parseLocalDate(isoDate);
  const day = date.getDate();
  const mes = MESES_LARGO[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${mes} ${year}`;
}

export function mapMascotaDetalleDTOtoUI(dto: MascotaDetalleDTO): MascotaDetalleUI {
  return {
    id: dto.id,
    nombre: dto.nombre,
    especie: dto.especie,
    raza: dto.raza,
    edad: `${dto.edad} años`,
    propietario: dto.propietario,
    fotoUrl: dto.fotoUrl,
  };
}

export function mapHistorialDTOtoUI(dto: HistorialDTO): HistorialUI {
  return {
    id: dto.id,
    fechaFormateada: formatFechaHistorial(dto.fecha),
    motivo: dto.motivo,
    observaciones: dto.observaciones,
    veterinario: dto.veterinario,
  };
}

export function mapVacunaDTOtoUI(dto: VacunaDTO): VacunaUI {
  return {
    id: dto.id,
    nombre: dto.nombre,
    fecha: formatFechaVacuna(dto.fechaAplicacion),
  };
}
