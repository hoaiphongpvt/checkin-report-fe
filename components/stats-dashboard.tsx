"use client"

import { useState } from "react"
import { StatsFilters } from "./stats-filters"
import { StatsDisplay } from "./stats-display"
import { useStatsData } from "@/hooks/use-stats-data"

export function StatsDashboard() {
  const [filters, setFilters] = useState({
    userId: "",
    startDate: "",
    endDate: "",
    loai: undefined as number | undefined,
    noMapPlaceId: false,
    nullIslandAddress: false,
    noMapPlaceIdAndNotNullIsland: false,
  })

  const { data, isLoading, error } = useStatsData(filters)

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Thống Kê Chấm Công</h2>
        <p className="text-slate-400">Xem thống kê chi tiết về chấm công của người dùng</p>
      </div>

      <div className="space-y-6">
        <StatsFilters filters={filters} setFilters={setFilters} />
        <StatsDisplay data={data} isLoading={isLoading} error={error} />
      </div>
    </div>
  )
}
