"use client";

import { useEffect, useState } from "react";
import { clienteMascotasService } from "../services/clienteMascotas.service";
import { mapMascotaDTOtoUI } from "../model/mapper";
import { MascotaUI } from "../model/ui.model";

interface ClienteMascotasViewModelState {
  // Data
  mascotas: MascotaUI[];
  loading: boolean;
  selectedMascota: MascotaUI | null;

  // Modal Agregar Mascota
  showAddModal: boolean;
  nombreMascota: string;
  razaMascota: string;
  specieSeleccionada: "perro" | "gato";

  // Modal Editar Mascota
  editNombre: string;
  editRaza: string;
  editEspecie: "perro" | "gato";

  // Acciones
  openAddModal: () => void;
  closeAddModal: () => void;
  setNombreMascota: (nombre: string) => void;
  setRazaMascota: (raza: string) => void;
  setSpecieSeleccionada: (specie: "perro" | "gato") => void;
  saveNewMascota: () => void;

  openEditModal: (mascota: MascotaUI) => void;
  closeEditModal: () => void;
  setEditNombre: (nombre: string) => void;
  setEditRaza: (raza: string) => void;
  setEditEspecie: (specie: "perro" | "gato") => void;
  saveEditedMascota: () => void;
}

export function useClienteMascotasViewModel(): ClienteMascotasViewModelState {
  const [mascotas, setMascotas] = useState<MascotaUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMascota, setSelectedMascota] = useState<MascotaUI | null>(null);

  // Modal Agregar
  const [showAddModal, setShowAddModal] = useState(false);
  const [nombreMascota, setNombreMascota] = useState("");
  const [razaMascota, setRazaMascota] = useState("");
  const [specieSeleccionada, setSpecieSeleccionada] = useState<"perro" | "gato">("perro");

  // Modal Editar
  const [editNombre, setEditNombre] = useState("");
  const [editRaza, setEditRaza] = useState("");
  const [editEspecie, setEditEspecie] = useState<"perro" | "gato">("perro");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dtos = await clienteMascotasService.getMascotas();
      setMascotas(dtos.map(mapMascotaDTOtoUI));
      setLoading(false);
    };
    fetchData();
  }, []);

  // Acciones Modal Agregar
  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNombreMascota("");
    setRazaMascota("");
    setSpecieSeleccionada("perro");
  };

  const saveNewMascota = () => {
    if (!nombreMascota.trim()) return;
    // Aquí iría la lógica para agregar mascota al servidor
    console.log("[ViewModel] Agrega mascota:", {
      nombre: nombreMascota,
      raza: razaMascota,
      especie: specieSeleccionada,
    });
    closeAddModal();
  };

  // Acciones Modal Editar
  const openEditModal = (mascota: MascotaUI) => {
    setSelectedMascota(mascota);
    setEditNombre(mascota.nombre);
    setEditRaza(""); // Buscar raza si existe en DTO
    setEditEspecie(mascota.icon === "perro" || mascota.icon === "gato" ? mascota.icon : "perro");
  };

  const closeEditModal = () => {
    setSelectedMascota(null);
    setEditNombre("");
    setEditRaza("");
    setEditEspecie("perro");
  };

  const saveEditedMascota = () => {
    if (!selectedMascota || !editNombre.trim()) return;
    // Aquí iría la lógica para editar mascota en el servidor
    console.log("[ViewModel] Edita mascota:", {
      id: selectedMascota.id,
      nombre: editNombre,
      raza: editRaza,
      especie: editEspecie,
    });
    closeEditModal();
  };

  return {
    mascotas,
    loading,
    selectedMascota,
    showAddModal,
    nombreMascota,
    razaMascota,
    specieSeleccionada,
    editNombre,
    editRaza,
    editEspecie,
    openAddModal,
    closeAddModal,
    setNombreMascota,
    setRazaMascota,
    setSpecieSeleccionada,
    saveNewMascota,
    openEditModal,
    closeEditModal,
    setEditNombre,
    setEditRaza,
    setEditEspecie,
    saveEditedMascota,
  };
}