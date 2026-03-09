"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAgendarCita } from "../context";
import { appointmentsService } from "@/modules/citas/services/appointmentsService";
import { Veterinario } from "../types";

export default function FechaPage() {
  const router = useRouter();
  const {
    selectedService,
    selectedVeterinario,
    setSelectedVeterinario,
    selectedFecha,
    setSelectedFecha,
  } = useAgendarCita();

  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [isLoadingVets, setIsLoadingVets] = useState(true);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    if (!selectedService) {
      router.replace('/agendar-cita/servicio');
      return;
    }
    loadVeterinarios();
  }, [selectedService, router]);

  const loadVeterinarios = async () => {
    try {
      setIsLoadingVets(true);
      const response = await appointmentsService.getProfessionals();
      if (response.success) {
        setVeterinarios(response.data);
      }
    } catch (error) {
      console.error('Error cargando veterinarios:', error);
    } finally {
      setIsLoadingVets(false);
    }
  };

  const checkAvailability = async (fecha: string) => {
    if (!selectedVeterinario) return;

    try {
      setIsCheckingAvailability(true);
      setAvailabilityMessage("");

      const response = await appointmentsService.getAvailability({
        id_personal: selectedVeterinario.id_personal,
        fecha
      });

      if (response.success && response.data.disponible) {
        setSelectedFecha(fecha);
        setAvailabilityMessage("");
      } else {
        setSelectedFecha(null);
        setAvailabilityMessage("No hay disponibilidad para esta fecha. Por favor selecciona otro día.");
      }
    } catch (error) {
      console.error('Error verificando disponibilidad:', error);
      setAvailabilityMessage("Error al verificar disponibilidad.");
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleDayClick = (day: number) => {
    if (!selectedVeterinario) {
      setAvailabilityMessage("Por favor selecciona un profesional primero.");
      return;
    }

    setSelectedDay(day);
    const fecha = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const fechaStr = fecha.toISOString().split('T')[0];
    checkAvailability(fechaStr);
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const changeMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
    setSelectedDay(null);
    setSelectedFecha(null);
    setAvailabilityMessage("");
  };

  const monthNames = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
  const dayNames = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

  const isValid = selectedVeterinario && selectedFecha;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">NUEVA CITA</p>
        <h1 className="text-3xl font-bold text-gray-900">Elegir día</h1>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar profesional
        </label>
        {isLoadingVets ? (
          <div className="text-gray-500">Cargando veterinarios...</div>
        ) : (
          <select
            value={selectedVeterinario?.id_personal || ""}
            onChange={(e) => {
              const vet = veterinarios.find(v => v.id_personal === parseInt(e.target.value));
              setSelectedVeterinario(vet || null);
              setSelectedDay(null);
              setSelectedFecha(null);
              setAvailabilityMessage("");
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F8F83] focus:ring-2 focus:ring-[#2F8F83]/20 outline-none"
          >
            <option value="">Cualquier profesional</option>
            {veterinarios.map((vet) => (
              <option key={vet.id_personal} value={vet.id_personal}>
                Dr. {vet.nombre} {vet.apellido} - {vet.especialidad}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg">←</button>
          <h2 className="text-lg font-semibold">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg">→</button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map((day, idx) => (
            <div key={`day-${idx}`} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {getDaysInMonth().map((day, index) => (
            <div key={`cell-${index}`} className="aspect-square">
              {day ? (
                <button
                  onClick={() => handleDayClick(day)}
                  disabled={isCheckingAvailability || !selectedVeterinario}
                  className={`w-full h-full rounded-lg flex items-center justify-center transition-all
                    ${selectedDay === day && selectedFecha ? "bg-[#2F8F83] text-white font-semibold" : selectedVeterinario ? "hover:bg-gray-100 text-gray-700" : "text-gray-300 cursor-not-allowed"}`}
                >
                  {day}
                </button>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>

        {isCheckingAvailability && (
          <div className="mt-4 text-center text-sm text-gray-600">Verificando disponibilidad...</div>
        )}

        {availabilityMessage && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-start gap-2">
            <span className="text-xl">⚠️</span>
            <span className="text-sm">{availabilityMessage}</span>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          disabled={!isValid}
          onClick={() => router.push('/agendar-cita/horario')}
          className={`h-12 px-10 rounded-xl font-medium text-sm transition-colors ${isValid ? "bg-[#2F8F83] text-white hover:bg-[#267A6F]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}