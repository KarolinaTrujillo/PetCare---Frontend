"use client";

import { useEffect, useState } from "react";
import { veterinariosService } from "../services/personal.service";
import { mapVeterinarioDTOtoUI } from "../model/mapper";
import { VeterinarioUI } from "../model/ui.model";

interface VeterinariosViewModelState {
  veterinarios: VeterinarioUI[];
  filteredVeterinarios: VeterinarioUI[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
}

export function useVeterinariosViewModel(): VeterinariosViewModelState {
  const [veterinarios, setVeterinarios] = useState<VeterinarioUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dtos = await veterinariosService.getVeterinarios();
      setVeterinarios(dtos.map(mapVeterinarioDTOtoUI));
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredVeterinarios = veterinarios.filter((v) => {
    const term = searchTerm.toLowerCase();
    return (
      v.nombre.toLowerCase().includes(term) ||
      v.especialidad.toLowerCase().includes(term) ||
      v.email.toLowerCase().includes(term)
    );
  });

  return { veterinarios, filteredVeterinarios, searchTerm, setSearchTerm, loading };
}