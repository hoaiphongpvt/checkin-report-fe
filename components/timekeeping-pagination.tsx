"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TimekeepingPaginationProps {
  currentPage: number
  totalPages: number
  totalRecords: number // Added totalRecords prop
  onPageChange: (page: number) => void
}

export function TimekeepingPagination({ currentPage, totalPages, totalRecords, onPageChange }: TimekeepingPaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-slate-400">
        Trang <span className="font-semibold text-slate-200">{currentPage}</span> của{" "}
        <span className="font-semibold text-slate-200">{totalPages}</span> (Tổng số bản ghi:{" "}
        <span className="font-semibold text-slate-200">{totalRecords}</span>)
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }

            return (
              <Button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                className={
                  currentPage === pageNum
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700"
                }
              >
                {pageNum}
              </Button>
            )
          })}
        </div>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
