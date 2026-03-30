import { SidebarAdminComponent } from '@/src/features/dashboard-admin/presentation/components/SidebarAdmin'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarAdminComponent />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}