import { SidebarProvider, DashboardShell } from '@/components/DashboardLayout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardShell>
        {children}
      </DashboardShell>
    </SidebarProvider>
  )
}
