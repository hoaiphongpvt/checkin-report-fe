import { TimekeepingNav } from "@/components/timekeeping-nav"
import { StatsDashboard } from "@/components/stats-dashboard"

export default function StatsPage() {
  return (
    <>
      <TimekeepingNav />
      <main className="min-h-screen bg-background">
        {/* <StatsDashboard /> */} {/* Temporarily hidden */}
      </main>
    </>
  )
}
