import { TimekeepingNav } from "@/components/timekeeping-nav"
import { TimekeepingDashboard } from "@/components/timekeeping-dashboard"

export default function TeacherPage() {
  return (
    <>
      <TimekeepingNav />
      <main className="min-h-screen bg-background">
        <TimekeepingDashboard
          userType="teacher"
          title="Quản lý Chấm Công Giáo viên"
          description="Theo dõi và quản lý dữ liệu chấm công của giáo viên"
        />
      </main>
    </>
  )
}
