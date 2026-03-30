'use client'

import { useState, useEffect } from 'react'
import { usuarioService } from '@/src/features/dashboard-cliente/infrastructure/services/usuario.service'
import { GetUsuarioUseCase } from '@/src/features/dashboard-cliente/domain/usecases/get-usuario.usecase'
import { UpdatePerfilUseCase } from '@/src/features/dashboard-cliente/domain/usecases/update-perfil.usecase'
import { Usuario } from '@/src/features/dashboard-cliente/domain/entities/usuario.entity'
import { useAlert } from '@/src/core/hooks/useAlert'
import { getErrorMessage } from '@/src/core/lib/error-messages'

const getUsuarioUseCase = new GetUsuarioUseCase(usuarioService)
const updatePerfilUseCase = new UpdatePerfilUseCase(usuarioService)

const USUARIO_VACIO: Usuario = {
  id: 0, nombre: '', apellido: '', email: '', telefono: '', avatar_url: '',
}

export const useConfiguracionViewModelVet = () => {
  const [usuario, setUsuario]     = useState<Usuario>(USUARIO_VACIO)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)

  const [nombre, setNombre]       = useState('')
  const [apellido, setApellido]   = useState('')
  const [telefono, setTelefono]   = useState('')
  const [editando, setEditando]   = useState(false)
  const [fotoPerfil, setFotoPerfil] = useState<File | undefined>(undefined)

  const [abierto, setAbierto]     = useState(false)
  const [actual, setActual]       = useState('')
  const [nueva, setNueva]         = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordError, setPasswordError]     = useState<string | null>(null)
  const [passwordOk, setPasswordOk]           = useState(false)

  const { alert, hideAlert, success, error: showError } = useAlert()

  const aplicarUsuario = (u: Usuario) => {
    setUsuario(u)
    setNombre(u.nombre ?? '')
    setApellido(u.apellido ?? '')
    setTelefono(u.telefono ?? '')
  }

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        setIsLoading(true)
        const userLocal = localStorage.getItem('user')
        if (userLocal) aplicarUsuario(JSON.parse(userLocal) as Usuario)

        try {
          const data = await getUsuarioUseCase.execute()
          aplicarUsuario(data)
          localStorage.setItem('user', JSON.stringify(data))
        } catch (apiError) {
          if (!userLocal) throw apiError
        }
      } catch (e: any) {
        setError(getErrorMessage(e))
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsuario()
  }, [])

  const handleGuardarPerfil = async () => {
    try {
      const updated = await updatePerfilUseCase.execute(usuario.id, {
        nombre, apellido, telefono,
        foto_perfil: fotoPerfil,
      })
      aplicarUsuario(updated)
      localStorage.setItem('user', JSON.stringify(updated))
      setEditando(false)
      setFotoPerfil(undefined)
      success('¡Perfil actualizado!', 'Tus datos fueron guardados correctamente.')
    } catch (e: any) {
      showError('Error al guardar', getErrorMessage(e))
    }
  }

  const handleCancelarPerfil = () => {
    setNombre(usuario.nombre)
    setApellido(usuario.apellido)
    setTelefono(usuario.telefono)
    setFotoPerfil(undefined)
    setEditando(false)
  }

  const handleGuardarPassword = async () => {
    setPasswordError(null)
    setPasswordOk(false)

    if (!actual || !nueva || !confirmar) {
      setPasswordError('Completa todos los campos.')
      return
    }
    if (nueva !== confirmar) {
      setPasswordError('Las contraseñas nuevas no coinciden.')
      return
    }
    if (nueva.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    try {
      setPasswordLoading(true)
      await usuarioService.changePassword(actual, nueva)
      setPasswordOk(true)
      setActual(''); setNueva(''); setConfirmar('')
      success('¡Contraseña actualizada!', 'Tu contraseña fue cambiada correctamente.')
      setTimeout(() => { setPasswordOk(false); setAbierto(false) }, 2000)
    } catch (e: any) {
      setPasswordError(getErrorMessage(e))
    } finally {
      setPasswordLoading(false)
    }
  }

  return {
    usuario: { ...usuario, nombre, apellido, telefono },
    isLoading, error,
    editando, setEditando,
    nombre, setNombre,
    apellido, setApellido,
    telefono, setTelefono,
    fotoPerfil, setFotoPerfil,
    handleGuardarPerfil, handleCancelarPerfil,
    abierto, setAbierto,
    actual, setActual,
    nueva, setNueva,
    confirmar, setConfirmar,
    passwordLoading, passwordError, passwordOk,
    handleGuardarPassword,
    alert, hideAlert,
  }
}