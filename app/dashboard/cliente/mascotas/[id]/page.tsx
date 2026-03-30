import { MascotaDetalleScreen } from '@/src/features/dashboard-cliente/presentation/views/mascotas/detalle/MascotaDetalleScreen'
import { use } from 'react'

export default function MascotaDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <MascotaDetalleScreen mascotaId={Number(id)} />
}