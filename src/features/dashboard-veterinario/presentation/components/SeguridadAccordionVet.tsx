'use client'

import { Shield, ChevronRight, KeyRound, Check, Eye, EyeOff, Loader2 } from 'lucide-react'

interface SeguridadAccordionProps {
  abierto: boolean
  onToggle: () => void
  actual: string
  nueva: string
  confirmar: string
  setActual: (v: string) => void
  setNueva: (v: string) => void
  setConfirmar: (v: string) => void
  showActual: boolean
  showNueva: boolean
  showConfirmar: boolean
  toggleActual: () => void
  toggleNueva: () => void
  toggleConfirmar: () => void
  onGuardar: () => void
  passwordLoading?: boolean
  passwordError?: string | null
  passwordOk?: boolean
}

export const SeguridadAccordionVet = ({
  abierto, onToggle,
  actual, nueva, confirmar,
  setActual, setNueva, setConfirmar,
  showActual, showNueva, showConfirmar,
  toggleActual, toggleNueva, toggleConfirmar,
  onGuardar,
  passwordLoading, passwordError, passwordOk,
}: SeguridadAccordionProps) => (
  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer text-left"
    >
      <div className="flex items-center gap-3">
        <span className="w-7 h-7 rounded-xl bg-[#267A6E]/10 text-[#267A6E] flex items-center justify-center">
          <Shield size={14} />
        </span>
        <div>
          <p className="text-sm font-semibold text-gray-800">Privacidad y seguridad</p>
          <p className="text-xs text-gray-400">Contraseña, permisos y sesiones</p>
        </div>
      </div>
      <ChevronRight size={14} className={`text-gray-300 transition-transform duration-200 ${abierto ? 'rotate-90' : ''}`} />
    </button>

    {abierto && (
      <div className="px-5 pb-5 flex flex-col gap-3 border-t border-gray-50">
        <div className="flex items-center gap-1.5 pt-4">
          <KeyRound size={12} className="text-[#267A6E]" />
          <p className="text-xs font-semibold text-gray-500">Cambiar contraseña</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <PasswordField label="Contraseña actual"          value={actual}    onChange={setActual}    show={showActual}    toggle={toggleActual} />
          <PasswordField label="Nueva contraseña"           value={nueva}     onChange={setNueva}     show={showNueva}     toggle={toggleNueva} />
          <PasswordField label="Confirmar nueva contraseña" value={confirmar} onChange={setConfirmar} show={showConfirmar} toggle={toggleConfirmar} />
        </div>

        {passwordError && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-xl">
            {passwordError}
          </p>
        )}

        {passwordOk && (
          <p className="text-xs text-[#267A6E] bg-[#267A6E]/5 border border-[#267A6E]/20 px-3 py-2 rounded-xl flex items-center gap-1.5">
            <Check size={11} /> Contraseña actualizada correctamente
          </p>
        )}

        <div className="flex justify-end pt-1">
          <button
            onClick={onGuardar}
            disabled={passwordLoading}
            className="flex items-center gap-1 text-xs font-semibold text-white bg-[#267A6E] hover:bg-[#1d6259] disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            {passwordLoading
              ? <><Loader2 size={11} className="animate-spin" /> Guardando...</>
              : <><Check size={11} /> Guardar contraseña</>
            }
          </button>
        </div>
      </div>
    )}
  </div>
)

interface PasswordFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  show: boolean
  toggle: () => void
}

const PasswordField = ({ label, value, onChange, show, toggle }: PasswordFieldProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-400 font-medium">{label}</label>
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full text-sm text-gray-900 border border-gray-200 rounded-xl px-3 py-2 pr-9 outline-none focus:border-[#267A6E] transition-colors bg-white"
      />
      <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
        {show ? <EyeOff size={13} /> : <Eye size={13} />}
      </button>
    </div>
  </div>
)