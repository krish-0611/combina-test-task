/**
 * PayoutsLastQuarter Component - Pixel Perfect
 * 
 * Displays payout statistics with bar chart matching the exact design.
 */
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, Zap } from 'lucide-react'
import { usePayouts } from '@/hooks/useDashboardData'
import type { PayoutData } from '@/lib/api/mock-data'
import avatar1 from '@/assets/avatar-1.png'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

const BarChart = ({ data }: { data: PayoutData[] }) => {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="flex items-end justify-between gap-3 h-50 mt-6">
      {data.map((item, index) => {
        const height = (item.value / maxValue) * 100
        let backgroundColor = '#E5E6EA'
        if (item.isIgnored) backgroundColor = '#1B1917'
        if (item.isActive) backgroundColor = '#D1FF4B'
        return (
          <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full hover:cursor-pointer">
            <div className="w-full flex flex-col items-center justify-end h-full hover:scale-105 transition-all duration-300 origin-bottom">
              <div
                className="w-full transition-all rounded-full"
                style={{ height: `${height}%`, minHeight: item.isRecent ? '8px' : '4px', backgroundColor: backgroundColor }}
              />
            </div>
            {<span className="text-[10px] text-[#6b7280] font-medium h-1"> {!item.isIgnored ? item.month : ''}</span>}
          </div>
        )
      })}
    </div>
  )
}

const PayoutsLastQuarter = () => {
  const { data: payouts, isLoading, error } = usePayouts()

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>Failed to load payouts</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-white rounded-[30px] p-6"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
    >
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2 rounded-full px-4 py-1 w-fit shadow-[0px_1px_4px_rgba(0,0,0,0.16)]">
          <Zap className="h-[14px] w-[14px] fill-foreground" />
          <h2 className="text-xs font-semibold text-[#111827]">Payouts last quarter</h2>
        </div>
        <div className="flex items-center ">
          <Avatar className="h-7 w-7 rounded-full">
            <AvatarImage src={avatar1 as string} alt="avatar" className="object-cover rounded-full border-[#D1D5DB] bg-[#F4F3F1]" />
          </Avatar>
        </div>
      </div>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-32 rounded" />
          <Skeleton className="h-10 w-24 rounded" />
          <div className="flex items-end justify-between gap-1.5 h-40 mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <Skeleton className="w-full h-full rounded-t" />
                <Skeleton className="h-3 w-12 rounded" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-end gap-2 justify-between mt-5 mb-10">
            <div className="m-0">
              <span className="text-4xl font-bold text-[#111827]">
                {payouts?.increase}
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold text-[#111827]">
                {payouts?.total}
              </span>
            </div>
          </div>

          {payouts?.data && <BarChart data={payouts.data} />}
        </div>
      )}
    </div>
  )
}

export default PayoutsLastQuarter
