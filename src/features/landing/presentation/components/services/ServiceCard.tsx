'use client'

import { ServiceCardProps } from '../../types/services.types'

export const ServiceCard = ({ title, icon, details }: ServiceCardProps) => {
  return (
    <div className="group relative block h-64 w-[260px]">
      <span className="absolute inset-0 border-2 border-dashed border-[#267A6E]" />

      <div className="relative flex h-full transform flex-col justify-end border-2 border-[#267A6E] bg-white transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 overflow-hidden">

        <div className="absolute top-5 left-5 transition-all duration-300 -translate-y-20 group-hover:translate-y-0">
          {icon}
        </div>

        <div className="px-6 pb-6">
          <div className="mb-3 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2">
            {icon}
          </div>
          <h2 className="text-lg font-bold text-black transition-opacity duration-300 group-hover:opacity-0">
            {title}
          </h2>
        </div>

        <div className="absolute inset-x-6 bottom-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ul className="space-y-2">
            {details.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-gray-500">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#267A6E] flex-shrink-0" />
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-bold text-[#267A6E] cursor-pointer hover:underline">
            Agendar cita →
          </p>
        </div>

      </div>
    </div>
  )
}