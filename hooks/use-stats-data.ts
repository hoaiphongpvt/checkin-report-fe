"use client"

import useSWR from "swr"

const API_BASE_URL = "http://localhost:3000"

interface StatsFilters {
  userId: string
  startDate: string
  endDate: string
  loai?: number
  noMapPlaceId: boolean
  nullIslandAddress: boolean
  noMapPlaceIdAndNotNullIsland: boolean
}

interface StatsResponse {
  success: boolean
  data: {
    stats: {
      totalRecords: number
      uniqueDays: number
      firstCheckin: string
      lastCheckin: string
    }
    records: any[]
  }
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to fetch stats")
  }
  return res.json()
}

export function useStatsData(filters: StatsFilters) {
  const params = new URLSearchParams()

  if (filters.userId) params.append("userId", filters.userId)
  if (filters.startDate) params.append("startDate", filters.startDate)
  if (filters.endDate) params.append("endDate", filters.endDate)
  if (filters.loai) params.append("loai", filters.loai.toString())
  if (filters.noMapPlaceId) params.append("noMapPlaceId", "true")
  if (filters.nullIslandAddress) params.append("nullIslandAddress", "true")
  if (filters.noMapPlaceIdAndNotNullIsland) params.append("noMapPlaceIdAndNotNullIsland", "true")

  const url = `${API_BASE_URL}/api/timekeeping/stats?${params.toString()}`

  const { data, error, isLoading } = useSWR<StatsResponse>(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  })

  return {
    data: data?.data,
    isLoading,
    error: error?.message,
  }
}
