'use client'

import { ProcessCardProps } from "../../types/process.types"

export const ProcessCard = ({ number, title, description, index }: ProcessCardProps) => {
  return (
    <div
      className="relative rounded-2xl p-8 flex flex-col gap-3"
      style={{ backgroundColor: '#30302E', marginTop: `${index * 2}rem` }}
    >
      <span
        className="absolute top-3 right-4 text-7xl font-bold leading-none select-none"
        style={{ color: '#1dad65' }}
      >
        {number}
      </span>
      <div className="w-11 h-11 rounded-full border-2 border-[#267A6E] flex items-center justify-center">
        <span className="text-[#267A6E] font-bold">{index + 1}</span>
      </div>
      <p className="text-white font-bold text-lg">{title}</p>
      <p className="text-gray-400 text-sm font-light leading-relaxed">{description}</p>
    </div>
  )
}