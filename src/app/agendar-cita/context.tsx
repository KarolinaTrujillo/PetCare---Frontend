"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Servicio, Veterinario, Mascota } from "./types";

interface AgendarCitaContextType {
  selectedService: Servicio | null;
  setSelectedService: (s: Servicio | null) => void;
  
  selectedVeterinario: Veterinario | null;
  setSelectedVeterinario: (v: Veterinario | null) => void;
  
  selectedFecha: string | null;
  setSelectedFecha: (f: string | null) => void;
  
  selectedHorario: string | null;
  setSelectedHorario: (h: string | null) => void;
  
  selectedMascota: Mascota | null;
  setSelectedMascota: (m: Mascota | null) => void;
  
  motivo: string;
  setMotivo: (m: string) => void;
  
  // Datos del usuario
  email: string;
  setEmail: (e: string) => void;
  nombre: string;
  setNombre: (n: string) => void;
  apellido: string;
  setApellido: (a: string) => void;
  telefono: string;
  setTelefono: (t: string) => void;
  
  // Datos de la mascota (para usuarios nuevos)
  especie: string;
  setEspecie: (e: string) => void;
  nombreMascota: string;
  setNombreMascota: (n: string) => void;
  raza: string;
  setRaza: (r: string) => void;
  
  resetFlow: () => void;
  isComplete: () => boolean;
}

const AgendarCitaContext = createContext<AgendarCitaContextType | null>(null);

export const useAgendarCita = () => {
  const context = useContext(AgendarCitaContext);
  if (!context) {
    throw new Error("useAgendarCita debe usarse dentro de AgendarCitaProvider");
  }
  return context;
};

export function AgendarCitaProvider({ children }: { children: React.ReactNode }) {
  const [selectedService, setSelectedService] = useState<Servicio | null>(null);
  const [selectedVeterinario, setSelectedVeterinario] = useState<Veterinario | null>(null);
  const [selectedFecha, setSelectedFecha] = useState<string | null>(null);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [selectedMascota, setSelectedMascota] = useState<Mascota | null>(null);
  const [motivo, setMotivo] = useState("");
  
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  
  const [especie, setEspecie] = useState("");
  const [nombreMascota, setNombreMascota] = useState("");
  const [raza, setRaza] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("agendarCitaFlow");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.selectedService) setSelectedService(data.selectedService);
        if (data.selectedVeterinario) setSelectedVeterinario(data.selectedVeterinario);
        if (data.selectedFecha) setSelectedFecha(data.selectedFecha);
        if (data.selectedHorario) setSelectedHorario(data.selectedHorario);
        if (data.selectedMascota) setSelectedMascota(data.selectedMascota);
        if (data.motivo) setMotivo(data.motivo);
        if (data.email) setEmail(data.email);
        if (data.nombre) setNombre(data.nombre);
        if (data.apellido) setApellido(data.apellido);
        if (data.telefono) setTelefono(data.telefono);
        if (data.especie) setEspecie(data.especie);
        if (data.nombreMascota) setNombreMascota(data.nombreMascota);
        if (data.raza) setRaza(data.raza);
      } catch (error) {
        console.error('Error loading saved flow:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("agendarCitaFlow", JSON.stringify({
      selectedService,
      selectedVeterinario,
      selectedFecha,
      selectedHorario,
      selectedMascota,
      motivo,
      email,
      nombre,
      apellido,
      telefono,
      especie,
      nombreMascota,
      raza,
    }));
  }, [selectedService, selectedVeterinario, selectedFecha, selectedHorario, selectedMascota, motivo, email, nombre, apellido, telefono, especie, nombreMascota, raza]);

  const resetFlow = () => {
    setSelectedService(null);
    setSelectedVeterinario(null);
    setSelectedFecha(null);
    setSelectedHorario(null);
    setSelectedMascota(null);
    setMotivo("");
    setEmail("");
    setNombre("");
    setApellido("");
    setTelefono("");
    setEspecie("");
    setNombreMascota("");
    setRaza("");
    localStorage.removeItem("agendarCitaFlow");
  };

  const isComplete = () => {
    return !!(
      selectedService &&
      selectedVeterinario &&
      selectedFecha &&
      selectedHorario &&
      (selectedMascota || nombreMascota)
    );
  };

  return (
    <AgendarCitaContext.Provider
      value={{
        selectedService,
        setSelectedService,
        selectedVeterinario,
        setSelectedVeterinario,
        selectedFecha,
        setSelectedFecha,
        selectedHorario,
        setSelectedHorario,
        selectedMascota,
        setSelectedMascota,
        motivo,
        setMotivo,
        email,
        setEmail,
        nombre,
        setNombre,
        apellido,
        setApellido,
        telefono,
        setTelefono,
        especie,
        setEspecie,
        nombreMascota,
        setNombreMascota,
        raza,
        setRaza,
        resetFlow,
        isComplete,
      }}
    >
      {children}
    </AgendarCitaContext.Provider>
  );
}