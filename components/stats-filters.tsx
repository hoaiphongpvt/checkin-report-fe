"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface StatsFiltersProps {
  filters: {
    userId: string
    startDate: string
    endDate: string
    loai?: number
    noMapPlaceId: boolean
    nullIslandAddress: boolean
    noMapPlaceIdAndNotNullIsland: boolean
  }
  setFilters: (filters: any) => void
}

export function StatsFilters({ filters, setFilters }: StatsFiltersProps) {
  const handleReset = () => {
    setFilters({
      userId: "",
      startDate: "",
      endDate: "",
      loai: undefined,
      noMapPlaceId: false,
      nullIslandAddress: false,
      noMapPlaceIdAndNotNullIsland: false,
    })
  }

  return (
    <Card className="bg-slate-800 border-slate-700 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* User ID */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">ID Người Dùng</label>
          <Input
            type="text"
            placeholder="Nhập ID người dùng"
            value={filters.userId}
            onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Ngày Bắt Đầu</label>
          <Input
            type="datetime-local"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Ngày Kết Thúc</label>
          <Input
            type="datetime-local"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
        </div>

        {/* Loai */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Loại</label>
          <select
            value={filters.loai || ""}
            onChange={(e) =>
              setFilters({ ...filters, loai: e.target.value ? Number.parseInt(e.target.value) : undefined })
            }
            className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
          >
            <option value="">Tất cả</option>
            <option value="1">Vào (1)</option>
            <option value="2">Ra (2)</option>
            <option value="3">Khác (3)</option>
          </select>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.noMapPlaceId}
            onChange={(e) => setFilters({ ...filters, noMapPlaceId: e.target.checked })}
            className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500"
          />
          <span className="text-sm text-slate-300">Không có MapPlaceID</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.nullIslandAddress}
            onChange={(e) => setFilters({ ...filters, nullIslandAddress: e.target.checked })}
            className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500"
          />
          <span className="text-sm text-slate-300">Null Island</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.noMapPlaceIdAndNotNullIsland}
            onChange={(e) => setFilters({ ...filters, noMapPlaceIdAndNotNullIsland: e.target.checked })}
            className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500"
          />
          <span className="text-sm text-slate-300">Không MapPlaceID & Không Null Island</span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
        >
          Đặt Lại
        </Button>
      </div>
    </Card>
  )
}
