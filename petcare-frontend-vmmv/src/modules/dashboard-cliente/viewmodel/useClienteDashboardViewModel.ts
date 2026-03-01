"use client";

import { useEffect, useState } from "react";
import { clienteDashboardService } from "../services/clientedashboard.service";
import { mapClienteDashboardDTOtoUI } from "../model/mapper";
import { ClienteDashboardUI } from "../model/ui.model";

interface ClienteDashboardViewModelState {
  data: ClienteDashboardUI | null;
  loading: boolean;
  error: string | null;
}

export function useClienteDashboardViewModel(): ClienteDashboardViewModelState {
  const [data, setData] = useState<ClienteDashboardUI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const dto = await clienteDashboardService.getDashboard();
        setData(mapClienteDashboardDTOtoUI(dto));
      } catch {
        setError("No se pudieron cargar los datos del dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}