'use client'
import { useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from '@/src/core/components/ui/sidebar'
import { LogOut } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { Routes } from '@/src/core/navigator/routes'
import { links } from '../data/sidebar.data'
import Cookies from 'js-cookie'
import { getUsuarioLocal } from '@/src/core/lib/auth/get-usuario-local'

export const SidebarComponent = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const usuario = getUsuarioLocal()

  const iniciales = usuario
    ? `${usuario.nombre?.[0] ?? ''}${usuario.apellido?.[0] ?? ''}`.toUpperCase()
    : 'U'

  const nombreCompleto = usuario
    ? `${usuario.nombre} ${usuario.apellido}`
    : 'Usuario'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    Cookies.remove('token')
    router.push(Routes.auth.login)
  }

  const avatarIcon = usuario?.avatar_url ? (
    <img
      src={usuario.avatar_url}
      alt={nombreCompleto}
      className="w-7 h-7 rounded-full object-cover shrink-0"
    />
  ) : (
    <div className="w-7 h-7 rounded-full bg-[#267A6E] flex items-center justify-center text-white text-xs font-bold shrink-0">
      {iniciales}
    </div>
  )

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? (
            <div className="flex items-center gap-2 py-1">
              <img src="/logo.webp" alt="PetCare" className="w-7 h-7" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-black"
              >
                <span className="text-black">Pet</span>
                <span className="text-[#267A6E]">Care</span>
              </motion.span>
            </div>
          ) : (
            <div className="py-1">
              <img src="/logo.webp" alt="PetCare" className="w-7 h-7" />
            </div>
          )}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link) => (
              <SidebarLink key={link.label} link={link} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-2 py-2 text-sm text-neutral-700 hover:text-black transition-colors cursor-pointer"
          >
            <LogOut className="h-5 w-5 shrink-0 text-neutral-700" />
            {open && <span>Cerrar sesión</span>}
          </button>
          <SidebarLink
            link={{
              label: nombreCompleto,
              href: Routes.dashboard.cliente.configuracion,
              icon: avatarIcon,
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  )
}