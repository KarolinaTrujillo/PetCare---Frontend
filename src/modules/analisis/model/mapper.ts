import { DashboardMetricsDTO } from "./metrics.dto";
import { DashboardMetricsUI } from "./metrics.ui.model";

function formatTrend(value: number): string {
  return value >= 0 ? `+${value}%` : `${value}%`;
}

function formatTotal(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return String(value);
}

export function mapMetricsDTOtoUI(dto: DashboardMetricsDTO): DashboardMetricsUI {
  return {
    citasDelMes: dto.citasDelMes,
    citasTrendLabel: formatTrend(dto.citasTrend),
    citasTrendPositive: dto.citasTrend >= 0,
    nuevosPacientes: dto.nuevosPacientes,
    nuevosPacientesTrendLabel: formatTrend(dto.nuevosPacientesTrend),
    nuevosPacientesTrendPositive: dto.nuevosPacientesTrend >= 0,
    totalServiciosLabel: formatTotal(dto.totalServicios),
    appointmentsByMonth: dto.appointmentsByMonth,
    serviceDistribution: dto.serviceDistribution,
  };
}