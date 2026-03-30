'use client'

import { useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from '@/src/core/components/ui/sidebar'
import { LogOut } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { Routes } from '@/src/core/navigator/routes'
import { linksAdmin } from '../data/sidebar.data'
import Cookies from 'js-cookie'

export const SidebarAdminComponent = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    Cookies.remove('token')
    router.push(Routes.auth.login)
  }

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
            {linksAdmin.map((link) => (
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
              label: 'Admin',
              href: Routes.dashboard.admin.configuracion,
              icon: (
                <div className="w-7 h-7 rounded-full bg-[#267A6E] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  A
                </div>
              ),
            }}
          />
        </div>

      </SidebarBody>
    </Sidebar>
  )
}