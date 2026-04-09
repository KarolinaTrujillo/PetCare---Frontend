import { SidebarComponent } from '@/src/features/dashboard-cliente/presentation/components/Sidebar'

export default function ClienteDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <SidebarComponent />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}