"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

type DaySchedule = {
  enabled: boolean;
  start: string;
  end: string;
};

type Schedule = {
  [key: string]: DaySchedule;
};

const initialSchedule: Schedule = {
  lunes: { enabled: true, start: "09:00", end: "18:00" },
  martes: { enabled: true, start: "09:00", end: "18:00" },
  miercoles: { enabled: true, start: "09:00", end: "18:00" },
  jueves: { enabled: true, start: "09:00", end: "18:00" },
  viernes: { enabled: true, start: "09:00", end: "14:00" },
  sabado: { enabled: false, start: "09:00", end: "14:00" },
  domingo: { enabled: false, start: "09:00", end: "14:00" },
};

export default function ConfiguracionVeterinario() {
  const [schedule, setSchedule] = useState<Schedule>(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("vet_schedule");
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return initialSchedule;
});
  const [duration, setDuration] = useState(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("appointment_duration");
    if (stored) {
      return stored;
    }
  }
  return "30";
});
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleScheduleChange = (
    day: string,
    field: "enabled" | "start" | "end",
    value: any
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const saveSchedule = () => {
    for (const day in schedule) {
      const d = schedule[day];

      if (d.enabled && d.start >= d.end) {
        alert(`Horario inválido en ${day}`);
        return;
      }
    }

    localStorage.setItem("vet_schedule", JSON.stringify(schedule));
    localStorage.setItem("appointment_duration", duration);

    alert("Cambios guardados correctamente");
  };

  return (
    <div className="p-8 max-w-5xl space-y-10">

      <h1 className="text-2xl font-semibold">
        Configuración de Perfil
      </h1>

      {/* PERFIL */}

      <div className="bg-white rounded-lg border p-6 space-y-4">

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">
              Nombre completo
            </label>
            <Input placeholder="Nombre del veterinario" />
          </div>

          <div>
            <label className="text-sm font-medium">
              Correo electrónico
            </label>
            <Input placeholder="correo@email.com" />
          </div>

        </div>

        <div>
          <label className="text-sm font-medium">
            Teléfono
          </label>
          <Input placeholder="Número telefónico" />
        </div>

        <div className="flex justify-end">
          <Button>
            Guardar cambios
          </Button>
        </div>

      </div>

      {/* SEGURIDAD */}

      <div className="bg-white rounded-lg border p-6 flex justify-between items-center">

        <div>
          <h2 className="font-medium">
            Seguridad
          </h2>

          <p className="text-sm text-gray-500">
            Actualiza tu contraseña de acceso
          </p>
        </div>

        <Button
          onClick={() => setShowPasswordModal(true)}
        >
          Cambiar contraseña
        </Button>

      </div>

      {/* HORARIOS */}

      <div className="bg-white rounded-lg border p-6 space-y-6">

        <h2 className="text-lg font-semibold">
          Configuración de Horarios
        </h2>

        {Object.entries(schedule).map(([day, data]) => (
          <div
            key={day}
            className="flex items-center gap-4"
          >

            <input
              type="checkbox"
              checked={data.enabled}
              onChange={(e) =>
                handleScheduleChange(
                  day,
                  "enabled",
                  e.target.checked
                )
              }
            />

            <span className="w-28 capitalize">
              {day}
            </span>

            <input
              type="time"
              value={data.start}
              disabled={!data.enabled}
              onChange={(e) =>
                handleScheduleChange(
                  day,
                  "start",
                  e.target.value
                )
              }
              className="border rounded px-2 py-1"
            />

            <span>a</span>

            <input
              type="time"
              value={data.end}
              disabled={!data.enabled}
              onChange={(e) =>
                handleScheduleChange(
                  day,
                  "end",
                  e.target.value
                )
              }
              className="border rounded px-2 py-1"
            />

            {!data.enabled && (
              <span className="text-gray-400 text-sm">
                No disponible
              </span>
            )}

          </div>
        ))}

        <div className="flex items-center gap-4">

          <label className="font-medium">
            Duración de cita
          </label>

          <select
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value)
            }
            className="border rounded px-3 py-2"
          >
            <option value="15">15 minutos</option>
            <option value="30">30 minutos</option>
            <option value="45">45 minutos</option>
            <option value="60">60 minutos</option>
          </select>

        </div>

        <div className="flex justify-end">
          <Button onClick={saveSchedule}>
            Guardar horarios
          </Button>
        </div>

      </div>

      {/* MODAL CAMBIAR CONTRASEÑA */}

      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Cambiar contraseña"
      >

        <div className="space-y-4">

          <Input
            type="password"
            placeholder="Nueva contraseña"
          />

          <Input
            type="password"
            placeholder="Confirmar contraseña"
          />

          <div className="flex justify-end gap-3">

            <Button
              variant="secondary"
              onClick={() => setShowPasswordModal(false)}
            >
              Cancelar
            </Button>

            <Button>
              Guardar cambios
            </Button>

          </div>

        </div>

      </Modal>

    </div>
  );
}