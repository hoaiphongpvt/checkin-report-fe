'use client'

import useSWR from 'swr'

const API_BASE_URL = 'https://checkin-report-api.pvt.io.vn'

interface TimekeepingFilters {
  startDate: string
  endDate: string
  teacherName?: string // Added teacherName filter
  staffName?: string // Added staffName filter
  noMapPlaceId: boolean
  nullIslandAddress: boolean
  noMapPlaceIdAndNotNullIsland: boolean
  page: number
  limit: number
  userType?: 'teacher' | 'staff'
}

interface TimekeepingResponse {
  success: boolean
  data: {
    records: any[]
    pagination: {
      limit: number
      page: number
      total: number
      totalPages: number
    }
  }
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export function useTimekeepingData(filters: TimekeepingFilters) {
  const params = new URLSearchParams()

  if (filters.startDate) params.append('startDate', filters.startDate)
  if (filters.endDate) params.append('endDate', filters.endDate)

  if (filters.userType === 'teacher' && filters.teacherName)
    params.append('teacherName', filters.teacherName)
  if (filters.userType === 'staff' && filters.staffName)
    params.append('staffName', filters.staffName)

  if (filters.noMapPlaceId) params.append('noMapPlaceId', 'true')
  if (filters.nullIslandAddress) params.append('nullIslandAddress', 'true')
  if (filters.noMapPlaceIdAndNotNullIsland)
    params.append('noMapPlaceIdAndNotNullIsland', 'true')
  params.append('page', filters.page.toString())
  params.append('limit', filters.limit.toString())

  const endpoint = filters.userType === 'staff' ? 'staff' : 'teacher'
  const url = `${API_BASE_URL}/api/timekeeping/${endpoint}?${params.toString()}`
  console.log('Fetching URL:', url)

  const { data, error, isLoading } = useSWR<TimekeepingResponse>(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  })

  return {
    data: data?.data,
    isLoading,
    error: error?.message,
  }
}
