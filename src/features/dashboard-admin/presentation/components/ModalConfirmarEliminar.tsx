import { Trash2, X } from 'lucide-react'

interface Props {
  isOpen: boolean
  nombre: string
  onConfirm: () => void
  onClose: () => void
  isLoading?: boolean
}

export const ModalConfirmarEliminar = ({ isOpen, nombre, onConfirm, onClose, isLoading }: Props) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <Trash2 size={18} className="text-red-500" />
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-gray-900 font-semibold text-base">¿Eliminar usuario?</h3>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">{nombre}</span> será desactivado y no podrá iniciar sesión.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
            Cancelar
          </button>
          <button onClick={onConfirm} disabled={isLoading}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors disabled:opacity-50 cursor-pointer">
            {isLoading ? 'Eliminando...' : 'Sí, eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}