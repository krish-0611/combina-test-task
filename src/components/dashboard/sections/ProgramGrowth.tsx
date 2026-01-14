/**
 * ProgramGrowth Component - Pixel Perfect
 * 
 * Displays program growth with partner acquisition breakdown matching exact design.
 */
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { useProgramGrowth } from '@/hooks/useDashboardData'
import type { PartnerSource } from '@/lib/api/mock-data'

const ProgressBars = ({ sources }: { sources: PartnerSource[] }) => {
  const total = sources.reduce((sum, source) => sum + source.count, 0)

  return (
    <div className="space-y-4 mt-6">
      {sources.map((source) => {
        const percentage = (source.count / total) * 100
        return (
          <div key={source.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#111827]">{source.name}</span>
              <span className="text-sm font-semibold text-[#6b7280]">
                {source.count} Partners
              </span>
            </div>
            <div className="w-full h-2 bg-[#F5F5F4] rounded-full overflow-hidden">
              <div
                className={`h-full transition-all rounded-full ${source.color}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

const ProgramGrowth = () => {
  const { data: programGrowth, isLoading, error } = useProgramGrowth()
  const [activeTab, setActiveTab] = useState<'application' | 'product' | 'campaign'>('application')

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>Failed to load program growth</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-white rounded-[30px] p-6"
      style={{ boxShadow: 'rgba(5, 2, 2, 0.1) 0px 4px 12px' }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-[#111827]">Program Growth</h2>
          <p className="text-sm text-[#6b7280] mt-1">
            New partner acquisition breakdown
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'application' | 'product' | 'campaign')} className="mb-6">
          <TabsList className="p-0 h-auto gap-2 flex-wrap bg-muted/50 p-1">
            <TabsTrigger
              value="application"
              className="bg-transparent text-[#6b7280] border-[#d1d5db] hover:bg-[#f9fafb] rounded-full px-4 py-1.5 text-xs font-bold h-auto uppercase data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:border-transparent"
            >
              APPLICATION
            </TabsTrigger>
            <TabsTrigger
              value="product"
              className="bg-transparent text-[#6b7280] border-[#d1d5db] hover:bg-[#f9fafb] rounded-full px-4 py-1.5 text-xs font-bold h-auto uppercase data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:border-transparent"
            >
              PRODUCT
            </TabsTrigger>
            <TabsTrigger
              value="campaign"
              className="bg-transparent text-[#6b7280] border-[#d1d5db] hover:bg-[#f9fafb] rounded-full px-4 py-1.5 text-xs font-bold h-auto uppercase data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:border-transparent"
            >
              CAMPAIGN
            </TabsTrigger>
          </TabsList>
        </Tabs>

      </div>

      {!isLoading && programGrowth && (
        <div className="flex gap-2 items-end">
          <span className="text-3xl text-[#111827]">
            {programGrowth.count}
          </span>
          <div className="flex items-center gap-1 text-[#1B9A6D] font-bold bg-[#EAFEF6] px-2 py-0.5 rounded-full size-fit">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-medium">This Month</span>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="space-y-4 mt-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        programGrowth?.sources && <ProgressBars sources={programGrowth.sources} />
      )}
    </div>
  )
}

export default ProgramGrowth
