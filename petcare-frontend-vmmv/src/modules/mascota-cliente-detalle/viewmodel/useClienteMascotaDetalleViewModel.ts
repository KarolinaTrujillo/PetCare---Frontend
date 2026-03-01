"use client";

import { useEffect, useState } from "react";
import { clienteMascotaDetalleService } from "../services/clienteMascotaDetalle.service";
import {
  mapMascotaDetalleDTOtoUI,
  mapHistorialDTOtoUI,
  mapVacunaDTOtoUI,
} from "../model/mapper";
import { MascotaDetalleUI, HistorialUI, VacunaUI, TabActivo } from "../model/ui.model";

interface ClienteMascotaDetalleViewModelState {
  mascota: MascotaDetalleUI | null;
  historial: HistorialUI[];
  vacunas: VacunaUI[];
  isLoading: boolean;
  isLoadingVacunas: boolean;
  error: string | null;
  tabActivo: TabActivo;
  setTabActivo: (tab: TabActivo) => void;
}

export function useClienteMascotaDetalleViewModel(
  mascotaId: string
): ClienteMascotaDetalleViewModelState {
  const [mascota, setMascota] = useState<MascotaDetalleUI | null>(null);
  const [historial, setHistorial] = useState<HistorialUI[]>([]);
  const [vacunas, setVacunas] = useState<VacunaUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingVacunas, setIsLoadingVacunas] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tabActivo, setTabActivo] = useState<TabActivo>("historial");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [mascotaDTO, historialDTOs] = await Promise.all([
          clienteMascotaDetalleService.getMascotaDetalle(mascotaId),
          clienteMascotaDetalleService.getHistorialByMascotaId(mascotaId),
        ]);
        setMascota(mascotaDTO ? mapMascotaDetalleDTOtoUI(mascotaDTO) : null);
        setHistorial(historialDTOs.map(mapHistorialDTOtoUI));
      } catch {
        setError("No se pudo cargar la información de la mascota.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [mascotaId]);

  useEffect(() => {
    if (tabActivo !== "vacunas") return;
    if (vacunas.length > 0) return;

    const loadVacunas = async () => {
      setIsLoadingVacunas(true);
      try {
        const dtos = await clienteMascotaDetalleService.getVacunasByMascotaId(mascotaId);
        setVacunas(dtos.map(mapVacunaDTOtoUI));
      } catch {
        setError("No se pudo cargar la cartilla de vacunación.");
      } finally {
        setIsLoadingVacunas(false);
      }
    };
    loadVacunas();
  }, [tabActivo, mascotaId, vacunas.length]);

  return {
    mascota,
    historial,
    vacunas,
    isLoading,
    isLoadingVacunas,
    error,
    tabActivo,
    setTabActivo,
  };
}
