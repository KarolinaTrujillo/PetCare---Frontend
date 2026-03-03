"use client";

import { Search, Filter, Plus, Eye, Pencil } from "lucide-react";

export default function MisPacientesPage() {
  const pacientes = [
    {
      id: 1,
      nombre: "Buddy",
      especie: "Perro",
      raza: "Golden Retriever",
      propietario: "Sarah Jenkins",
      estado: "ACTIVO",
    },
    {
      id: 2,
      nombre: "Misty",
      especie: "Gato",
      raza: "Siamés",
      propietario: "Mark Thompson",
      estado: "ACTIVO",
    },
    {
      id: 3,
      nombre: "Bella",
      especie: "Perro",
      raza: "Border Terrier",
      propietario: "Linda Garcia",
      estado: "INACTIVO",
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1E293B]">
            Mis pacientes
          </h1>
          <p className="text-sm text-[#64748B]">
            Gestión integral de la base de datos clínica.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              placeholder="Buscar pacientes..."
              className="h-10 pl-9 pr-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8F83]/30"
            />
          </div>

          <button className="h-10 px-4 rounded-xl border border-gray-200 text-sm flex items-center gap-2 hover:bg-gray-50">
            <Filter size={16} />
            Filtrar
          </button>

          <button className="h-10 px-4 rounded-xl bg-[#2F8F83] text-white text-sm flex items-center gap-2 hover:bg-[#287A70] transition">
            <Plus size={16} />
            Nuevo paciente
          </button>
        </div>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-6 py-4">Mascota</th>
              <th className="text-left px-6 py-4">Especie / Raza</th>
              <th className="text-left px-6 py-4">Propietario</th>
              <th className="text-left px-6 py-4">Estado</th>
              <th className="text-right px-6 py-4">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {pacientes.map((paciente) => (
              <tr key={paciente.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-5 font-medium text-[#1E293B]">
                  {paciente.nombre}
                </td>

                <td className="px-6 py-5 text-[#64748B]">
                  <div className="font-medium text-[#1E293B]">
                    {paciente.especie}
                  </div>
                  <div className="text-xs">{paciente.raza}</div>
                </td>

                <td className="px-6 py-5 text-[#64748B]">
                  {paciente.propietario}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      paciente.estado === "ACTIVO"
                        ? "bg-[#E6F4F2] text-[#2F8F83]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {paciente.estado}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-3 text-gray-500">
                    <button className="hover:text-[#2F8F83] transition">
                      <Eye size={16} />
                    </button>

                    <button className="hover:text-[#2F8F83] transition">
                      <Pencil size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="px-6 py-4 flex items-center justify-between text-xs text-gray-500">
          <span>Mostrando 3 de 128 pacientes</span>

          <div className="flex items-center gap-2">
            <button className="h-8 w-8 rounded-lg border border-gray-200">
              1
            </button>
            <button className="h-8 w-8 rounded-lg bg-[#2F8F83] text-white">
              2
            </button>
            <button className="h-8 w-8 rounded-lg border border-gray-200">
              3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}