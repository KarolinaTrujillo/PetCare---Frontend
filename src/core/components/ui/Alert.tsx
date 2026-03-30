'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { AlertState } from '../../hooks/useAlert'

const alertConfig = {
  success: {
    icon: <CheckCircle size={18} />,
    bg: 'bg-gray-900',
    icon_color: 'text-emerald-400',
    title_color: 'text-white',
    message_color: 'text-gray-400',
    dot: 'bg-emerald-400',
  },
  error: {
    icon: <XCircle size={18} />,
    bg: 'bg-gray-900',
    icon_color: 'text-red-400',
    title_color: 'text-white',
    message_color: 'text-gray-400',
    dot: 'bg-red-400',
  },
  warning: {
    icon: <AlertTriangle size={18} />,
    bg: 'bg-gray-900',
    icon_color: 'text-yellow-400',
    title_color: 'text-white',
    message_color: 'text-gray-400',
    dot: 'bg-yellow-400',
  },
  info: {
    icon: <Info size={18} />,
    bg: 'bg-gray-900',
    icon_color: 'text-blue-400',
    title_color: 'text-white',
    message_color: 'text-gray-400',
    dot: 'bg-blue-400',
  },
}

interface AlertProps {
  alert: AlertState
  onClose: () => void
}

export const Alert = ({ alert, onClose }: AlertProps) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (alert.isVisible) {
      setVisible(true)
    } else {
      setTimeout(() => setVisible(false), 300)
    }
  }, [alert.isVisible])

  if (!visible) return null

  const config = alertConfig[alert.type]

  return (
    <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-300 ${alert.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <div className={`relative flex items-center gap-3 ${config.bg} rounded-2xl px-4 py-3.5 shadow-2xl w-80`}>

        <div className={`w-1.5 h-1.5 rounded-full ${config.dot} shrink-0`} />

        <span className={`${config.icon_color} shrink-0`}>{config.icon}</span>

        <div className="flex flex-col flex-1 min-w-0">
          <p className={`text-sm font-semibold ${config.title_color} leading-tight`}>{alert.title}</p>
          <p className={`text-xs ${config.message_color} leading-tight mt-0.5`}>{alert.message}</p>
        </div>

        <button onClick={onClose} className="text-gray-600 hover:text-gray-400 transition-colors cursor-pointer shrink-0 ml-1">
          <X size={14} />
        </button>

      </div>
    </div>
  )
}