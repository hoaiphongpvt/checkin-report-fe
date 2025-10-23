"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react" // Import useState and useEffect
import { useDebounce } from "@/hooks/use-debounce" // Import useDebounce

interface TimekeepingFiltersProps {
  filters: {
    startDate: string
    endDate: string
    teacherName?: string // Changed to teacherName
    staffName?: string // Changed to staffName
    noMapPlaceId: boolean
    nullIslandAddress: boolean
    noMapPlaceIdAndNotNullIsland: boolean
    page: number
    limit: number
  }
  setFilters: (filters: any) => void
  userType?: "teacher" | "staff"
}

export function TimekeepingFilters({ filters, setFilters, userType = "teacher" }: TimekeepingFiltersProps) {
  const [nameInput, setNameInput] = useState(userType === "teacher" ? filters.teacherName || "" : filters.staffName || "");
  const debouncedName = useDebounce(nameInput, 500); // 500ms debounce delay

  useEffect(() => {
    setFilters({
      ...filters,
      [userType === "teacher" ? "teacherName" : "staffName"]: debouncedName,
      page: 1,
    });
  }, [debouncedName, userType]); // Only re-run if debouncedName or userType changes

  const handleReset = () => {
    setNameInput(""); // Reset local input state
    setFilters({
      startDate: "",
      endDate: "",
      teacherName: "", // Reset teacherName filter
      staffName: "", // Reset staffName filter
      noMapPlaceId: false,
      nullIslandAddress: false,
      noMapPlaceIdAndNotNullIsland: false,
      page: 1,
      limit: 50,
    })
  }

  return (
    <Card className="bg-slate-800 border-slate-700 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Ngày Bắt Đầu</label>
          <Input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value, page: 1 })}
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Ngày Kết Thúc</label>
          <Input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value, page: 1 })}
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
        </div>

        {/* Name Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Tên</label>
          <Input
            type="text"
            placeholder="Nhập tên"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
        </div>

        {/* Limit */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Số Bản Ghi/Trang</label>
          <Input
            type="number"
            min="10"
            max="100"
            value={filters.limit}
            onChange={(e) => setFilters({ ...filters, limit: Number.parseInt(e.target.value), page: 1 })}
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* Checkboxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.noMapPlaceId}
            onChange={(e) => setFilters({ ...filters, noMapPlaceId: e.target.checked, page: 1 })}
            className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500"
          />
          <span className="text-sm text-slate-300">Không có MapPlaceID</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.nullIslandAddress}
            onChange={(e) => setFilters({ ...filters, nullIslandAddress: e.target.checked, page: 1 })}
            className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500"
          />
          <span className="text-sm text-slate-300">Null Island</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.noMapPlaceIdAndNotNullIsland}
            onChange={(e) => setFilters({ ...filters, noMapPlaceIdAndNotNullIsland: e.target.checked, page: 1 })}
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
