"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useClienteMascotasViewModel } from "@/modules/mascotas-cliente/viewmodel/useClienteMascotasViewModel";
import MascotasHeader from "./MascotasHeader";
import MascotaCard from "./MascotaCard";
import AddMascotaCard from "./AddMascotaCard";
import AgregarMascotaModal from "./AgregarMascotaModal";
import EditarMascotaModal from "./EditarMascotaModal";

function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin" />
    </div>
  );
}

export function ClienteMascotasPage() {
  const router = useRouter();
  const vm = useClienteMascotasViewModel();

  if (vm.loading) return <Spinner />;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <MascotasHeader />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
        {vm.mascotas.map((mascota) => (
          <MascotaCard
            key={mascota.id}
            mascota={mascota}
            onVer={(id) => router.push(`/cliente/mismascotas/${id}`)}
            onEditar={() => vm.openEditModal(mascota)}
          />
        ))}
        <AddMascotaCard onClick={vm.openAddModal} />
      </div>

      <EditarMascotaModal
        isOpen={vm.selectedMascota !== null}
        onClose={vm.closeEditModal}
        onGuardar={vm.saveEditedMascota}
        editNombre={vm.editNombre}
        setEditNombre={vm.setEditNombre}
        editRaza={vm.editRaza}
        setEditRaza={vm.setEditRaza}
        editEspecie={vm.editEspecie}
        setEditEspecie={vm.setEditEspecie}
      />

      <AgregarMascotaModal
        isOpen={vm.showAddModal}
        onClose={vm.closeAddModal}
        onAgregar={vm.saveNewMascota}
        nombreMascota={vm.nombreMascota}
        setNombreMascota={vm.setNombreMascota}
        razaMascota={vm.razaMascota}
        setRazaMascota={vm.setRazaMascota}
        specieSeleccionada={vm.specieSeleccionada}
        setSpecieSeleccionada={vm.setSpecieSeleccionada}
      />
    </div>
  );
}