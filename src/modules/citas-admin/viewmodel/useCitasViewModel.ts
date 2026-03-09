"use client";

import { useEffect, useState } from "react";
import { citasService } from "../services/citas.service";
import { mapCitaDTOtoUI } from "../model/mapper";
import { CitaUI } from "../model/ui.model";

interface CitasViewModelState {
  citas: CitaUI[];
  filteredCitas: CitaUI[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
}

export function useCitasViewModel(): CitasViewModelState {
  const [citas, setCitas] = useState<CitaUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dtos = await citasService.getCitas();
      setCitas(dtos.map(mapCitaDTOtoUI));
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredCitas = citas.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.paciente.toLowerCase().includes(term) ||
      c.propietario.toLowerCase().includes(term) ||
      c.servicio.toLowerCase().includes(term)
    );
  });

  return { citas, filteredCitas, searchTerm, setSearchTerm, loading };
}