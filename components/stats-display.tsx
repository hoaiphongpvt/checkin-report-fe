'use client'

import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'

interface StatsDisplayProps {
  data:
    | {
        stats: {
          totalRecords: number
          uniqueDays: number
          firstCheckin: string
          lastCheckin: string
        }
        records: any[]
      }
    | undefined
  isLoading: boolean
  error?: string | null
}

export function StatsDisplay({ data, isLoading, error }: StatsDisplayProps) {
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

  if (!data) {
    return (
      <div className='p-6 text-center'>
        <p className='text-slate-400'>Không có dữ liệu</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card className='bg-slate-800 border-slate-700 p-6'>
          <div className='text-sm text-slate-400 mb-2'>Tổng Số Bản Ghi</div>
          <div className='text-3xl font-bold text-blue-400'>
            {data.stats.totalRecords}
          </div>
        </Card>
        <Card className='bg-slate-800 border-slate-700 p-6'>
          <div className='text-sm text-slate-400 mb-2'>Số Ngày Duy Nhất</div>
          <div className='text-3xl font-bold text-purple-400'>
            {data.stats.uniqueDays}
          </div>
        </Card>
        <Card className='bg-slate-800 border-slate-700 p-6'>
          <div className='text-sm text-slate-400 mb-2'>Check-in Đầu Tiên</div>
          <div className='text-xl font-bold text-green-400'>
            {new Date(data.stats.firstCheckin).toLocaleString('vi-VN')}
          </div>
        </Card>
        <Card className='bg-slate-800 border-slate-700 p-6'>
          <div className='text-sm text-slate-400 mb-2'>Check-in Cuối Cùng</div>
          <div className='text-xl font-bold text-red-400'>
            {new Date(data.stats.lastCheckin).toLocaleString('vi-VN')}
          </div>
        </Card>
      </div>

      {/* Detailed Records Table */}
      {data.records && data.records.length > 0 && (
        <Card className='bg-slate-800 border-slate-700 p-6'>
          <h3 className='text-lg font-semibold text-white mb-4'>
            Chi Tiết Bản Ghi
          </h3>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-slate-700 bg-slate-700/50'>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-200'>
                    ID
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-200'>
                    Thời Gian
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-200'>
                    Người Chấm Công
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-200'>
                    Loại
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
                {data.records.map((record, index) => (
                  <tr
                    key={record.ID || index}
                    className={`border-b border-slate-700 transition-colors ${
                      index % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800'
                    } hover:bg-slate-700/50`}
                  >
                    <td className='px-6 py-4 text-sm text-slate-300'>
                      {record.ID}
                    </td>
                    <td className='px-6 py-4 text-sm text-slate-300'>
                      {new Date(record.ThoiGian).toLocaleString('vi-VN')}
                    </td>
                    <td className='px-6 py-4 text-sm text-slate-300'>
                      {record.NguoiChamCong}
                    </td>
                    <td className='px-6 py-4 text-sm text-slate-300'>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          record.Loai === 1
                            ? 'bg-green-500/20 text-green-400'
                            : record.Loai === 2
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {record.Loai === 1
                          ? 'Nhân viên'
                          : record.Loai === 2
                          ? 'Giáo viên'
                          : 'N/A'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-sm text-slate-300'>
                      {record.DiaChi}
                    </td>
                    <td className='px-6 py-4 text-sm text-slate-300'>
                      {record.MapPlaceID ? (
                        <span className='text-green-400'>
                          {record.MapPlaceID}
                        </span>
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
        </Card>
      )}
    </div>
  )
}
