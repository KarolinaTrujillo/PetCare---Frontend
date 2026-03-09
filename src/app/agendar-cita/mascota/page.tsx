"use client";

import { useRouter } from "next/navigation";
import { useAgendarCita } from "../context";
import { useEffect, useState } from "react";

const RAZAS_PERRO_FALLBACK = ['Labrador', 'Golden Retriever', 'Bulldog', 'Poodle', 'Chihuahua', 'Pastor Alemán', 'Beagle', 'Rottweiler', 'Mestizo'];
const RAZAS_GATO_FALLBACK = ['Persa', 'Siamés', 'Maine Coon', 'Ragdoll', 'Bengal', 'Mestizo'];

export default function MascotaPage() {
  const router = useRouter();

  const {
    selectedService,
    email,
    especie,
    setEspecie,
    nombreMascota,
    setNombreMascota,
    raza,
    setRaza,
  } = useAgendarCita();

  const [razasDisponibles, setRazasDisponibles] = useState<string[]>([]);
  const [isLoadingRazas, setIsLoadingRazas] = useState(false);

  useEffect(() => {
    if (!selectedService || !email) {
      router.replace('/agendar-cita/servicio');
    }
  }, [selectedService, email, router]);

  useEffect(() => {
    if (especie) {
      loadRazas();
    }
  }, [especie]);

  const loadRazas = async () => {
    try {
      setIsLoadingRazas(true);
      const speciesId = especie === "perro" ? 1 : 2;
      
      const response = await fetch(`http://localhost:3003/api/pets/breeds?species_id=${speciesId}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        setRazasDisponibles(data.data.map((r: any) => r.nombre));
      } else {
        // Fallback
        setRazasDisponibles(especie === "perro" ? RAZAS_PERRO_FALLBACK : RAZAS_GATO_FALLBACK);
      }
    } catch (error) {
      console.error('Error cargando razas:', error);
      setRazasDisponibles(especie === "perro" ? RAZAS_PERRO_FALLBACK : RAZAS_GATO_FALLBACK);
    } finally {
      setIsLoadingRazas(false);
    }
  };

  const handleSelectEspecie = (tipo: string) => {
    setEspecie(tipo);
    setNombreMascota("");
    setRaza("");
  };

  const isValid = especie && nombreMascota.trim() !== "" && raza;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">NUEVA CITA</p>
        <h1 className="text-3xl font-bold text-gray-900">¿Quién es el paciente?</h1>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Especie
        </label>
        <div className="grid grid-cols-2 gap-6">
          {/* Perro */}
          <div
            onClick={() => handleSelectEspecie("perro")}
            className={`relative p-8 border-2 rounded-2xl text-center cursor-pointer transition-all
              ${especie === "perro" ? "border-[#2F8F83] bg-[#E6F4F2]" : "border-gray-200 hover:border-[#2F8F83]"}`}
          >
            {especie === "perro" && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-[#2F8F83] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            
            <div className={`mb-4 ${especie === "perro" ? "text-[#2F8F83]" : "text-gray-400"}`}>
              <svg className="w-20 h-20 mx-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 48C42 48 50 40 50 30C50 20 42 12 32 12C22 12 14 20 14 30C14 40 22 48 32 48Z" fill="currentColor" opacity="0.2"/>
                <circle cx="25" cy="28" r="2" fill="currentColor"/>
                <circle cx="39" cy="28" r="2" fill="currentColor"/>
                <path d="M32 32C32 32 28 34 28 36C28 38 30 40 32 40C34 40 36 38 36 36C36 34 32 32 32 32Z" fill="currentColor"/>
                <path d="M18 18L14 12M46 18L50 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M28 40C28 40 30 42 32 42C34 42 36 40 36 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className={`font-medium ${especie === "perro" ? "text-[#2F8F83]" : "text-gray-600"}`}>Perro</p>
          </div>

          {/* Gato */}
          <div
            onClick={() => handleSelectEspecie("gato")}
            className={`relative p-8 border-2 rounded-2xl text-center cursor-pointer transition-all
              ${especie === "gato" ? "border-[#2F8F83] bg-[#E6F4F2]" : "border-gray-200 hover:border-[#2F8F83]"}`}
          >
            {especie === "gato" && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-[#2F8F83] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            
            <div className={`mb-4 ${especie === "gato" ? "text-[#2F8F83]" : "text-gray-400"}`}>
              <svg className="w-20 h-20 mx-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 46C41 46 48 39 48 30C48 21 41 14 32 14C23 14 16 21 16 30C16 39 23 46 32 46Z" fill="currentColor" opacity="0.2"/>
                <circle cx="26" cy="28" r="2" fill="currentColor"/>
                <circle cx="38" cy="28" r="2" fill="currentColor"/>
                <path d="M32 30L32 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M28 34C28 34 30 36 32 36C34 36 36 34 36 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M20 12L16 8M44 12L48 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className={`font-medium ${especie === "gato" ? "text-[#2F8F83]" : "text-gray-600"}`}>Gato</p>
          </div>
        </div>
      </div>

      {especie && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input
              placeholder="Ej. Firulais"
              value={nombreMascota}
              onChange={(e) => setNombreMascota(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Raza</label>
            {isLoadingRazas ? (
              <div className="text-gray-500 py-3">Cargando razas...</div>
            ) : (
              <select
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                }}
              >
                <option value="">Escoge una raza</option>
                {razasDisponibles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <button
          disabled={!isValid}
          onClick={() => router.push('/agendar-cita/fecha')}
          className={`h-12 px-10 rounded-xl font-medium text-sm transition-colors
            ${isValid ? "bg-[#2F8F83] text-white hover:bg-[#267A6F]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          Agregar mascota →
        </button>
      </div>
    </div>
  );
}