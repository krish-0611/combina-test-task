/**
 * StatsCards Component - Pixel Perfect
 * 
 * Three stat cards: Outreached, Onboarded, Awaiting Deliverables.
 */
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, CircleCheck, Clock, Target } from 'lucide-react'
import { useStats } from '@/hooks/useDashboardData'
import type { StatCard } from '@/lib/api/mock-data'


const TargetIcon = ({ stat }: { stat: StatCard }) => {
  switch (stat.title) {
    case 'Outreached':
      return (
        <div className="bg-[#E9F0FC] p-1.5 sm:p-2 rounded-full">
          <Target className="h-4 w-4 text-[#538EF7]" />
        </div>
      )
    case 'Onboarded':
      return (
        <div className="bg-[#E8F4EE] p-1.5 sm:p-2 rounded-full">
          <CircleCheck className="h-4 w-4 text-[#3DC08E]" />
        </div>
      )
    case 'Awaiting Deliverables':
      return (
        <div className="bg-[#FBF2E4] p-1.5 sm:p-2 rounded-full">
          <Clock className="h-4 w-4 text-[#F6B14E]" />
        </div>
      )
    default:
      return null
  }
}

const StatCardItem = ({ stat }: { stat: StatCard }) => {
  return (
    <div
      className="bg-white rounded-[30px] px-6 py-4 hover:shadow-sm transition-shadow"
      style={{ boxShadow: 'rgba(5, 2, 2, 0.1) 0px 4px 12px' }}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-medium text-[#6b7280] uppercase tracking-wide">{stat.title}</h3>
          <TargetIcon stat={stat} />
        </div>
        <p className="text-2xl font-semibold text-[#111827] mb-0 mt-4">{stat.value}</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-[#6b7280]">{stat.description}</p>
          {stat.growth && (
            <span className="text-xs font-medium text-[#1B9A6D] bg-[#EAFEF6] px-2 py-0.5 rounded-sm">{stat.growth}</span>
          )}
        </div>
      </div>
    </div>
  )
}

const StatsCards = () => {
  const { data: stats, isLoading, error } = useStats()

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-[#e5e7eb] p-6">
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>Failed to load</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-[#e5e7eb] p-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-8 w-40 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats?.map((stat) => (
        <StatCardItem key={stat.title} stat={stat} />
      ))}
    </div>
  )
}

export default StatsCards
