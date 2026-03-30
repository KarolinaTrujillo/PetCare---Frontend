'use client'

import { NavBarVetProps } from "../types/navbar.vet.types"

export const NavBarVetComponent = ({ title, subtitle }: NavBarVetProps) => {
  return (
    <header className="flex flex-col gap-1 px-8 py-6 border-b border-gray-100">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </header>
  )
}