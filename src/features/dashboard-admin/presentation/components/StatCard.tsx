import { StatCardProps } from '../types/stat.card.types'

export const StatCard = ({ label, value, description, icon }: StatCardProps) => {
  return (
    <div className="relative bg-gradient-to-br from-[#267A6E] to-[#1d6259] rounded-2xl px-6 py-6 shadow-sm overflow-hidden flex items-center justify-between">
      <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10" />
      <div className="absolute -right-2 -bottom-8 w-20 h-20 rounded-full bg-white/5" />
      <div className="flex flex-col gap-2 z-10">
        <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">{label}</p>
        <p className="text-5xl font-bold text-white">{value}</p>
        <span className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full w-fit">{description}</span>
      </div>
      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center z-10 [&_svg]:text-white">
        {icon}
      </div>
    </div>
  )
}