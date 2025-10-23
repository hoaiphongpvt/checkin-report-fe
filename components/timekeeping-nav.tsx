'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useDarkMode } from '@/hooks/use-dark-mode'
import { Moon, Sun } from 'lucide-react'

export function TimekeepingNav() {
  const pathname = usePathname()
  const { isDark, toggle, mounted } = useDarkMode()

  return (
    <div className='bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 border-b border-slate-700 dark:border-slate-800 sticky top-0 z-50'>
      <div className='mx-auto max-w-7xl px-6 py-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-white'>Báo cáo chấm công</h1>
        <div className='flex gap-2 items-center'>
          <Link href='/teacher'>
            <Button
              variant={pathname === '/teacher' ? 'default' : 'outline'}
              className={
                pathname === '/teacher' ? 'bg-blue-600 hover:bg-blue-700' : ''
              }
            >
              Giáo viên
            </Button>
          </Link>
          <Link href='/staff'>
            <Button
              variant={pathname === '/staff' ? 'default' : 'outline'}
              className={
                pathname === '/staff' ? 'bg-blue-600 hover:bg-blue-700' : ''
              }
            >
              Nhân viên
            </Button>
          </Link>
          {/* <Link href="/stats">
            <Button
              variant={pathname === "/stats" ? "default" : "outline"}
              className={pathname === "/stats" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              Thống Kê
            </Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={toggle}
            disabled={!mounted}
            className="ml-2 border-slate-600 hover:bg-slate-700 bg-transparent"
          >
            {mounted &&
              (isDark ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-slate-300" />)}
          </Button> */}
        </div>
      </div>
    </div>
  )
}
