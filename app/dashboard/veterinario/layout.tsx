import { SidebarVetComponent } from '@/src/features/dashboard-veterinario/presentation/components/SidebarVet'

export default function VeterinarioDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarVetComponent />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}