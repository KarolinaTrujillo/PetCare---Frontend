'use client'

import { NavBarComponent } from '../../../components/NavBar'
import { LoaderOne } from '@/src/core/components/ui/loader'
import { useMascotaDetalleViewModel } from '../../../viewmodels/mascota-detalle.viewmodel'
import { PawPrint, ArrowLeft, Cake, Dna, Scale, Tag, ClipboardList, Stethoscope, Download } from 'lucide-react'
import Link from 'next/link'
import { Routes } from '@/src/core/navigator/routes'

interface MascotaDetalleScreenProps {
  mascotaId: number
}

export const MascotaDetalleScreen = ({ mascotaId }: MascotaDetalleScreenProps) => {
  const { mascota, historial, isLoading, error } = useMascotaDetalleViewModel(mascotaId)

  const edad = mascota?.fecha_nacimiento
    ? Math.floor((Date.now() - new Date(mascota.fecha_nacimiento).getTime()) / (1000 * 60 * 60 * 24 * 365))
    : null

  const handleDescargarPDF = async () => {
    const { default: jsPDF } = await import('jspdf')
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    const pageW = 210
    const pageH = 297

    // Cargar imagen de fondo
    const img = new Image()
    img.src = '/plantilla-historial.png'
    await new Promise(resolve => { img.onload = resolve })
    doc.addImage(img, 'PNG', 0, 0, pageW, pageH)

    // Logo / título
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.setTextColor(38, 122, 110)
    doc.text('PetCare', pageW / 2, 30, { align: 'center' })

    doc.setFontSize(13)
    doc.setTextColor(50, 50, 50)
    doc.text('Historial Clínico', pageW / 2, 38, { align: 'center' })

    // Datos de la mascota
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(80, 80, 80)

    const col1 = 25
    const col2 = 115
    let y = 55

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(38, 122, 110)
    doc.text('Datos de la mascota', col1, y)
    y += 7

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(60, 60, 60)

    doc.text(`Nombre:`, col1, y)
    doc.setFont('helvetica', 'bold')
    doc.text(`${mascota?.nombre ?? '—'}`, col1 + 22, y)
    doc.setFont('helvetica', 'normal')

    doc.text(`Especie:`, col2, y)
    doc.setFont('helvetica', 'bold')
    doc.text(`${mascota?.especie ?? '—'}`, col2 + 22, y)
    doc.setFont('helvetica', 'normal')
    y += 6

    doc.text(`Raza:`, col1, y)
    doc.setFont('helvetica', 'bold')
    doc.text(`${mascota?.raza ?? '—'}`, col1 + 22, y)
    doc.setFont('helvetica', 'normal')

    doc.text(`Sexo:`, col2, y)
    doc.setFont('helvetica', 'bold')
    doc.text(`${mascota?.sexo ?? '—'}`, col2 + 22, y)
    doc.setFont('helvetica', 'normal')
    y += 6

    doc.text(`Edad:`, col1, y)
    doc.setFont('helvetica', 'bold')
    doc.text(`${edad !== null ? `${edad} ${edad === 1 ? 'año' : 'años'}` : '—'}`, col1 + 22, y)
    doc.setFont('helvetica', 'normal')

    doc.text(`Peso:`, col2, y)
    doc.setFont('helvetica', 'bold')
    doc.text(`${mascota?.peso ? `${mascota.peso} kg` : '—'}`, col2 + 22, y)
    doc.setFont('helvetica', 'normal')
    y += 12

    // Línea separadora
    doc.setDrawColor(38, 122, 110)
    doc.setLineWidth(0.5)
    doc.line(col1, y, pageW - col1, y)
    y += 8

    // Título historial
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(38, 122, 110)
    doc.text('Registros del historial clínico', col1, y)
    y += 8

    if (historial.length === 0) {
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(10)
      doc.setTextColor(150, 150, 150)
      doc.text('Sin registros clínicos.', col1, y)
    } else {
      // Encabezados tabla
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(255, 255, 255)
      doc.setFillColor(38, 122, 110)
      doc.rect(col1, y - 4, pageW - col1 * 2, 7, 'F')
      doc.text('Fecha', col1 + 2, y)
      doc.text('Diagnóstico', col1 + 30, y)
      doc.text('Tratamiento', col1 + 85, y)
      doc.text('Observaciones', col1 + 130, y)
      y += 5

      historial.forEach((h, i) => {
        if (y > pageH - 40) {
          doc.addPage()
          doc.addImage(img, 'PNG', 0, 0, pageW, pageH)
          y = 30
        }

        if (i % 2 === 0) {
          doc.setFillColor(240, 248, 246)
          doc.rect(col1, y - 3, pageW - col1 * 2, 8, 'F')
        }

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.setTextColor(60, 60, 60)

        const fecha = new Date(h.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
        doc.text(fecha, col1 + 2, y)
        doc.text(doc.splitTextToSize(h.diagnostico ?? '—', 52)[0], col1 + 30, y)
        doc.text(doc.splitTextToSize(h.tratamiento ?? '—', 42)[0], col1 + 85, y)
        doc.text(doc.splitTextToSize(h.observaciones ?? '—', 38)[0], col1 + 130, y)
        y += 8
      })
    }

    // Fecha de generación
    y += 6
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(`Generado el ${new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}`, pageW / 2, pageH - 25, { align: 'center' })

    doc.save(`historial-${mascota?.nombre ?? 'mascota'}.pdf`)
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderOne />
      </div>
    )
  }

  if (error || !mascota) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">{error ?? 'Mascota no encontrada'}</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBarComponent
        title={mascota.nombre.toUpperCase()}
        subtitle="Ficha de mascota"
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-y-auto">

        <div className="flex items-center justify-between">
          <Link href={Routes.dashboard.cliente.mascotas} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#267A6E] transition-colors w-fit">
            <ArrowLeft size={15} /> Volver a mascotas
          </Link>

          <button
            onClick={handleDescargarPDF}
            className="flex items-center gap-2 bg-[#267A6E] hover:bg-[#1d6259] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            <Download size={14} />
            Descargar PDF
          </button>
        </div>

        {/* Info de la mascota */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-[#267A6E]/10 flex items-center justify-center shrink-0">
            <PawPrint size={28} className="text-[#267A6E]" />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">{mascota.nombre}</h2>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${mascota.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {mascota.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Tag size={13} className="text-[#267A6E]" />
                <span>{mascota.especie} · {mascota.sexo ?? '—'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Dna size={13} className="text-[#267A6E]" />
                <span>{mascota.raza ?? 'Sin raza'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Cake size={13} className="text-[#267A6E]" />
                <span>{edad !== null ? `${edad} ${edad === 1 ? 'año' : 'años'}` : '—'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Scale size={13} className="text-[#267A6E]" />
                <span>{mascota.peso ? `${mascota.peso} kg` : '—'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Historial */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-50">
            <ClipboardList size={16} className="text-[#267A6E]" />
            <h3 className="text-sm font-bold text-gray-900">Historial clínico</h3>
            <span className="text-xs text-gray-400">{historial.length} registros</span>
          </div>

          {historial.length > 0 ? (
            <div className="overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-50">
                    <th className="px-6 py-3 text-left font-semibold">Fecha</th>
                    <th className="px-6 py-3 text-left font-semibold">Diagnóstico</th>
                    <th className="px-6 py-3 text-left font-semibold">Tratamiento</th>
                    <th className="px-6 py-3 text-left font-semibold">Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((h, i) => (
                    <tr key={h.id} className={`hover:bg-gray-50 transition-colors ${i !== historial.length - 1 ? 'border-b border-gray-50' : ''}`}>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {new Date(h.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-medium">{h.diagnostico ?? '—'}</td>
                      <td className="px-6 py-4 text-gray-500">{h.tratamiento ?? '—'}</td>
                      <td className="px-6 py-4 text-gray-500">{h.observaciones ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-2">
                <Stethoscope size={32} className="text-gray-200" />
                <p className="text-sm text-gray-400">Sin historial clínico registrado</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}