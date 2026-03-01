"use client";

import { useEffect, useState } from "react";
import { clientesService } from "../services/clientes.service";
import { mapClienteDTOtoUI } from "../model/mapper";
import { ClienteUI } from "../model/ui.model";

interface ClientesViewModelState {
  clientes: ClienteUI[];
  filteredClientes: ClienteUI[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
}

export function useClientesViewModel(): ClientesViewModelState {
  const [clientes, setClientes] = useState<ClienteUI[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dtos = await clientesService.getClientes();
      setClientes(dtos.map(mapClienteDTOtoUI));
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredClientes = clientes.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.telefono.includes(term)
    );
  });

  return {
    clientes,
    filteredClientes,
    searchTerm,
    setSearchTerm,
    loading,
  };
}