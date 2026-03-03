"use client";

import { useEffect, useState } from "react";
import { analisisService } from "../services/analisis.service";
import { mapMetricsDTOtoUI } from "../model/mapper";
import { DashboardMetricsUI } from "../model/metrics.ui.model";

interface AnalisisViewModelState {
  metrics: DashboardMetricsUI | null;
  loading: boolean;
  error: string | null;
}

export function useAnalisisViewModel(): AnalisisViewModelState {
  const [metrics, setMetrics] = useState<DashboardMetricsUI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);
      try {
        const dto = await analisisService.getDashboardMetrics();
        setMetrics(mapMetricsDTOtoUI(dto));
      } catch {
        setError("No se pudieron cargar las métricas.");
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return { metrics, loading, error };
}