'use client'

import { useState } from 'react'
import { TimekeepingFilters } from './timekeeping-filters'
import { TimekeepingTable } from './timekeeping-table'
import { TimekeepingPagination } from './timekeeping-pagination'
import { useTimekeepingData } from '@/hooks/use-timekeeping-data'

interface TimekeepingDashboardProps {
  userType: 'teacher' | 'staff'
  title: string
  description: string
}

export function TimekeepingDashboard({
  userType,
  title,
  description,
}: TimekeepingDashboardProps) {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    teacherName: '', // Changed to teacherName
    staffName: '', // Changed to staffName
    noMapPlaceId: false,
    nullIslandAddress: false,
    noMapPlaceIdAndNotNullIsland: false,
    page: 1,
    limit: 50,
    userType,
  })

  const { data, isLoading, error } = useTimekeepingData(filters)
  console.log('Timekeeping Data:', data)

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        {/* <div className='mb-8'>
          <h1 className='text-4xl font-bold text-white mb-2'>{title}</h1>
          <p className='text-slate-400'>{description}</p>
        </div> */}

        {/* Filters */}
        <TimekeepingFilters
          filters={filters}
          setFilters={setFilters}
          userType={userType}
        />

        {/* Table */}
        <div className='mt-6 rounded-lg border border-slate-700 bg-slate-800 overflow-hidden shadow-xl'>
          <TimekeepingTable
            data={data?.records || []}
            isLoading={isLoading}
            error={error}
            userType={userType} // Pass userType to TimekeepingTable
          />
        </div>

        {/* Pagination */}
        {data && (
          <TimekeepingPagination
            currentPage={data.pagination.page}
            totalPages={data.pagination.totalPages}
            totalRecords={data.pagination.total} // Pass totalRecords from API response
            onPageChange={(page) => setFilters({ ...filters, page })}
          />
        )}
      </div>
    </div>
  )
}
