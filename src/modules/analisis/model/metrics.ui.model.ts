export interface AppointmentsByMonthUI {
  month: string;
  count: number;
}

export interface ServiceDistributionUI {
  label: string;
  percentage: number;
  color: string;
}

export interface DashboardMetricsUI {
  citasDelMes: number;
  citasTrendLabel: string;
  citasTrendPositive: boolean;
  nuevosPacientes: number;
  nuevosPacientesTrendLabel: string;
  nuevosPacientesTrendPositive: boolean;
  totalServiciosLabel: string;
  appointmentsByMonth: AppointmentsByMonthUI[];
  serviceDistribution: ServiceDistributionUI[];
}