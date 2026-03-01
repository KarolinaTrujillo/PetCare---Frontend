"use client";

import { useEffect, useState } from "react";
import { dashboardService } from "../services/dashboard.service";
import {
  mapAppointmentDTOtoUI,
  mapPatientDTOtoUI,
  mapStatsDTOtoUI,
} from "../model/mapper";
import { AppointmentUI, PatientUI, StatsUI } from "../model/ui.model";

interface DashboardViewModelState {
  stats: StatsUI | null;
  upcomingAppointments: AppointmentUI[];
  recentPatients: PatientUI[];
  loading: boolean;
}

export function useDashboardViewModel(): DashboardViewModelState {
  const [stats, setStats] = useState<StatsUI | null>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentUI[]>([]);
  const [recentPatients, setRecentPatients] = useState<PatientUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [statsDTO, appointmentsDTO, patientsDTO] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getUpcomingAppointments(),
        dashboardService.getRecentPatients(),
      ]);

      setStats(mapStatsDTOtoUI(statsDTO));
      setUpcomingAppointments(appointmentsDTO.map(mapAppointmentDTOtoUI));
      setRecentPatients(patientsDTO.map(mapPatientDTOtoUI));
      setLoading(false);
    };

    fetchData();
  }, []);

  return { stats, upcomingAppointments, recentPatients, loading };
}