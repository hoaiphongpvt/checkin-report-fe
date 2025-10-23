'use client'

import { Spinner } from '@/components/ui/spinner'

interface TimekeepingRecord {
  id: number
  NguoiChamCong: string
  TeacherName?: string // Added TeacherName field
  StaffName?: string // Added StaffName field
  ThoiGian: string
  Loai: number
  DiaChi: string
  MapPlaceID?: string | null
  GhiChu?: string | null // Added GhiChu field
}

interface TimekeepingTableProps {
  data: TimekeepingRecord[]
  isLoading: boolean
  error?: string | null
  userType?: "teacher" | "staff" // Added userType prop
}

export function TimekeepingTable({
  data,
  isLoading,
  error,
  userType = "teacher", // Destructure userType with default
}: TimekeepingTableProps) {
  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <Spinner className='w-8 h-8' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-6 text-center'>
        <p className='text-red-400'>Lỗi: {error}</p>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className='p-6 text-center'>
        <p className='text-slate-400'>Không có dữ liệu</p>
      </div>
    )
  }

  return (
    <div className='overflow-x-auto'>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-slate-700 bg-slate-700/50'>
            <th className='px-6 py-4 text-left text-sm font-semibold text-slate-200'>
              ID
            </th>
            <th className='px-6 py-4 text-left text-sm font-semibold text-slate-200'>
              Người Chấm Công
            </th>
            <th className='px-6 py-4 text-left text-sm font-semibold text-slate-200'>
              Tên
            </th>
            <th className='px-6 py-4 text-left text-sm font-semibold text-slate-200'>
              Thời Gian
            </th>
            <th className='px-6 py-4 text-left text-sm font-semibold text-slate-200'>
              Địa Chỉ
            </th>
            <th className='px-6 py-4 text-left text-sm font-semibold text-slate-200'>
              MapPlaceID
            </th>
            <th className='px-6 py-4 text-left text-sm font-semibold text-slate-200'>
              Ghi Chú
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr
              key={record.id || index}
              className={`border-b border-slate-700 transition-colors ${
                index % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800'
              } hover:bg-slate-700/50`}
            >
              <td className='px-6 py-4 text-sm text-slate-300'>{record.id}</td>
              <td className='px-6 py-4 text-sm text-slate-300'>
                {record.NguoiChamCong}
              </td>
              <td className='px-6 py-4 text-sm text-slate-300'>
                {userType === "teacher" ? record.TeacherName || '-' : record.StaffName || '-'}
              </td>
              <td className='px-6 py-4 text-sm text-slate-300'>
                {new Date(record.ThoiGian).toLocaleString('en-US', { // Using en-US for a neutral locale
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                  timeZone: 'UTC', // Display time in UTC
                })}
              </td>

              <td className='px-6 py-4 text-sm text-slate-300'>
                {record.DiaChi}
              </td>
              <td className='px-6 py-4 text-sm text-slate-300'>
                {record.MapPlaceID ? (
                  <span className='text-green-400'>{record.MapPlaceID}</span>
                ) : (
                  <span className='text-red-400'>-</span>
                )}
              </td>
              <td className='px-6 py-4 text-sm text-slate-300'>
                {record.GhiChu || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
