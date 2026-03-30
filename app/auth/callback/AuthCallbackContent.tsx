'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Routes } from '@/src/core/navigator/routes'
import { Role } from '@/src/features/auth/domain/entities/role.entity'
import { LoaderOne } from '@/src/core/components/ui/loader'
import Cookies from 'js-cookie'

export const AuthCallbackContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    console.log('===> URL:', window.location.href)
    console.log('===> Token desde searchParams:', token)

    if (!token) {
      console.log('===> Token null, redirigiendo al login')
      router.push(Routes.auth.login)
      return
    }

    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
      const payload = JSON.parse(atob(base64))
      const user = {
        id: payload.id,
        email: payload.email,
        rol: payload.rol,
        nombre: payload.nombre ?? '',
        apellido: payload.apellido ?? '',
        telefono: payload.telefono ?? '',
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      Cookies.set('token', token, { expires: 7 })

      switch (payload.rol) {
        case Role.ADMIN:
          router.push(Routes.dashboard.admin.overview)
          break
        case Role.VETERINARIO:
          router.push(Routes.dashboard.veterinario.overview)
          break
        case Role.USER:
        default:
          router.push(Routes.dashboard.cliente.overview)
      }
    } catch (error) {
      console.error("Auth error", error)
      router.push(Routes.auth.login)
    }
  }, [])

  return (
    <div className="h-screen flex items-center justify-center">
      <LoaderOne />
    </div>
  )
}