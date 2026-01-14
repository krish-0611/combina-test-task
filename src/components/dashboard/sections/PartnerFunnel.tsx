/**
 * PartnerFunnel Component - Pixel Perfect
 * 
 * Bright green section with funnel visualization matching the exact design.
 */
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, Zap } from 'lucide-react'
import { useState } from 'react'
import { useFunnel } from '@/hooks/useDashboardData'
import type { FunnelStage } from '@/lib/api/mock-data'

const FunnelBar = ({ stage, maxValue }: { stage: FunnelStage; maxValue: number }) => {

  // Map colors based on stage - matching the image description
  // Dark green bars getting progressively darker, then black for SALES
  const getBarColor = (label: string) => {
    if (label === 'TOTAL MARKET') return 'bg-[#A2CB39]' // Dark green
    if (label === 'PROSPECTS') return 'bg-[#BBE059]' // Medium dark green
    if (label === 'LEADS') return 'bg-[#DBF58C]' // Medium green
    if (label === 'SALES') return 'bg-[#1B1917]' // Black
    return 'bg-[#000000]'
  }

  const height = (stage.value / maxValue) * 100

  return (
    <div className="flex-1 m-0">
      <div className="w-full h-full overflow-visible flex flex-col gap-2 justify-end">
        <div
          className={`${getBarColor(stage.label)} relative transition-all rounded-[15px] mt-auto`}
          style={{ height: `${height}%` }}
        >
          <div className="flex flex-col absolute" style={{ bottom: 'calc(100% + 5px)', left: '5px' }}>
            <span className="text-xl font-semibold">
              {stage.value.toLocaleString()}
            </span>
            <span className="text-[10px] font-medium text-[#768B34]">{stage.label}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const PartnerFunnel = () => {
  const { data: funnel, isLoading, error } = useFunnel()
  const [activeTab, setActiveTab] = useState<'last-quarter' | 'influenced' | 'forecast'>('last-quarter')

  if (error) {
    return (
      <div className="bg-[#4ade80] rounded-lg border border-[#4ade80] p-6">
        <div className="flex items-center gap-2 text-sm text-white">
          <AlertCircle className="h-4 w-4" />
          <span>Failed to load funnel data</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-[#D1FF4B] rounded-[30px] p-6 text-black h-full"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
    >
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="h-[14px] w-[14px] fill-foreground" />
            <h2 className="text-lg font-semibold">Partner Funnel</h2>
          </div>
          {!isLoading && funnel && (
            <div className="flex items-end gap-2 mt-5">
              <div className="text-6xl vertical-align-bottom block m-0">
                {funnel.growth}
              </div>
              <div className="max-w-[100px] text-xs">
                {funnel.sales}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={activeTab === 'last-quarter' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('last-quarter')}
            className={activeTab === 'last-quarter'
              ? 'bg-black text-[white] hover:bg-black/90 rounded-full px-4 py-1.5 text-xs font-medium h-auto'
              : 'bg-[#BCDE44] text-black hover:bg-[#BCDE44]/90 rounded-full px-4 py-1.5 text-xs font-medium h-auto !outline-none border-none'
            }
          >
            Last quarter
          </Button>
          <Button
            variant={activeTab === 'influenced' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('influenced')}
            className={activeTab === 'influenced'
              ? 'bg-black text-[white] hover:bg-black/90 rounded-full px-4 py-1.5 text-xs font-medium h-auto'
              : 'bg-[#BCDE44] text-black hover:bg-[#BCDE44]/90 rounded-full px-4 py-1.5 text-xs font-medium h-auto !outline-none border-none'
            }
          >
            What has influenced
          </Button>
          <Button
            variant={activeTab === 'forecast' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('forecast')}
            className={activeTab === 'forecast'
              ? 'bg-black text-[white] hover:bg-black/90 rounded-full px-4 py-1.5 text-xs font-medium h-auto'
              : 'bg-[#BCDE44] text-black hover:bg-[#BCDE44]/90 rounded-full px-4 py-1.5 text-xs font-medium h-auto !outline-none border-none'
            }
          >
            Forecast
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32 bg-white/20" />
                <Skeleton className="h-4 w-20 bg-white/20" />
              </div>
              <Skeleton className="h-8 w-full rounded bg-white/20" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 flex gap-4 h-35 mt-20">
          {funnel?.stages.map((stage) => (
            <FunnelBar key={stage.label} stage={stage} maxValue={funnel.stages[0].value} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PartnerFunnel
