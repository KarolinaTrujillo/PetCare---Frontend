'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { NavBarComponent } from '../../components/NavBar'
import { PerfilCard } from '../../components/PerfilCard'
import { SeguridadAccordion } from '../../components/SeguridadAccordion'
import { useConfiguracionViewModel } from '../../viewmodels/configuracion.viewmodel'
import { LoaderOne } from "@/src/core/components/ui/loader"
import { Alert } from '@/src/core/components/ui/Alert'

export const ConfiguracionScreen = () => {
  const {
    usuario, isLoading, error,
    editando, setEditando,
    nombre, setNombre,
    apellido, setApellido,
    telefono, setTelefono,
    setFotoPerfil,
    handleGuardarPerfil, handleCancelarPerfil,
    abierto, setAbierto,
    actual, setActual,
    nueva, setNueva,
    confirmar, setConfirmar,
    passwordLoading, passwordError, passwordOk,
    handleGuardarPassword,
    alert, hideAlert,
  } = useConfiguracionViewModel()

  const [showActual, setShowActual]       = useState(false)
  const [showNueva, setShowNueva]         = useState(false)
  const [showConfirmar, setShowConfirmar] = useState(false)

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
      <Alert alert={alert} onClose={hideAlert} />

      <NavBarComponent
        title="CONFIGURACIÓN"
        subtitle="Administra tu perfil y preferencias"
      />

      <div className="flex flex-col flex-1 px-6 py-8 gap-6 overflow-y-auto">

        <PerfilCard
          nombre={nombre}
          apellido={apellido}
          email={usuario.email}
          telefono={telefono}
          avatar_url={usuario.avatar_url}
          editando={editando}
          onEditar={() => setEditando(true)}
          onGuardar={handleGuardarPerfil}
          onCancelar={handleCancelarPerfil}
          setNombre={setNombre}
          setApellido={setApellido}
          setTelefono={setTelefono}
          onAvatarChange={setFotoPerfil}
        />

        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">
            Preferencias
          </p>
          <SeguridadAccordion
            abierto={abierto}
            onToggle={() => setAbierto((v: boolean) => !v)}
            actual={actual}       nueva={nueva}       confirmar={confirmar}
            setActual={setActual} setNueva={setNueva} setConfirmar={setConfirmar}
            showActual={showActual}       showNueva={showNueva}       showConfirmar={showConfirmar}
            toggleActual={() => setShowActual((v: boolean) => !v)}
            toggleNueva={() => setShowNueva((v: boolean) => !v)}
            toggleConfirmar={() => setShowConfirmar((v: boolean) => !v)}
            onGuardar={handleGuardarPassword}
            passwordLoading={passwordLoading}
            passwordError={passwordError}
            passwordOk={passwordOk}
          />
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-500 border border-red-100 hover:border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors cursor-pointer">
            <Trash2 size={12} />
            Eliminar cuenta
          </button>
        </div>

      </div>
    </div>
  )
}