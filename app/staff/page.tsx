import { TimekeepingNav } from "@/components/timekeeping-nav"
import { TimekeepingDashboard } from "@/components/timekeeping-dashboard"

export default function StaffPage() {
  return (
    <>
      <TimekeepingNav />
      <main className="min-h-screen bg-background">
        <TimekeepingDashboard
          userType="staff"
          title="Quản lý Chấm Công Nhân viên"
          description="Theo dõi và quản lý dữ liệu chấm công của nhân viên"
        />
      </main>
    </>
  )
}
