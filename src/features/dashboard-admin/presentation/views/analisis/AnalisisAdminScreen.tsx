'use client'

import { NavBarAdminComponent } from '../../components/NavBarAdmin'
import { useAnalisisViewModel } from '../../viewmodels/analisis.viewmodel'
import { LoaderOne } from '@/src/core/components/ui/loader'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

const ESTADO_COLORS: Record<string, string> = {
  PENDIENTE:  '#FCD34D',
  CONFIRMADA: '#34D399',
  CANCELADA:  '#F87171',
  COMPLETADA: '#60A5FA',
  ATENDIDA:   '#A78BFA',
}

const BAR_COLORS = ['#267A6E', '#3B82F6', '#A78BFA', '#F59E0B', '#F87171']

export const AnalisisAdminScreen = () => {
  const {
    citas, totalClientes, totalVeterinarios,
    citasPorEstado, citasPorMesData, serviciosData,
    isLoading, error,
  } = useAnalisisViewModel()

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderOne />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBarAdminComponent
        title="ANÁLISIS"
        subtitle="Estadísticas y métricas del sistema"
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-y-auto">

        {/* Graficas fila 1 */}
        <div className="grid grid-cols-2 gap-4">

          {/* Citas por estado - dona */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Citas por estado</h3>
            {citasPorEstado.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={citasPorEstado}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {citasPorEstado.map((entry) => (
                      <Cell key={entry.name} fill={ESTADO_COLORS[entry.name] ?? '#94a3b8'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} citas`, '']} />
                  <Legend formatter={(value) => value} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-48 text-sm text-gray-400">Sin datos</div>
            )}
          </div>

          {/* Servicios más solicitados */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Servicios más solicitados</h3>
            {serviciosData.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={serviciosData} layout="vertical" margin={{ left: 10 }}>
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="nombre" tick={{ fontSize: 11 }} width={110} />
                  <Tooltip formatter={(value) => [`${value} citas`, 'Total']} />
                  <Bar dataKey="total" radius={[0, 6, 6, 0]}>
                    {serviciosData.map((_, i) => (
                      <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-48 text-sm text-gray-400">Sin datos</div>
            )}
          </div>

        </div>

        {/* Citas por mes */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Citas por mes</h3>
          {citasPorMesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={citasPorMesData} margin={{ left: 0 }}>
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => [`${value} citas`, 'Total']} />
                <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                  {citasPorMesData.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-40 text-sm text-gray-400">Sin datos</div>
          )}
        </div>

      </div>
    </div>
  )
}