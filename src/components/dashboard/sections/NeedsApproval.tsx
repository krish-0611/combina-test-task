/**
 * NeedsApproval Component - Pixel Perfect
 * 
 * Displays pending approval requests matching the exact design from the image.
 */
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, CircleCheck, Info } from 'lucide-react'
import { useApprovalItems } from '@/hooks/useDashboardData'
import type { ApprovalItem } from '@/lib/api/mock-data'

const ApprovalItemCard = ({ item, onReview }: { item: ApprovalItem; onReview: () => void }) => {
  return (
    <div
      className="bg-white rounded-2xl p-4 border-1 !border-[#FFF9E2]"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex flex-col min-w-0 gap-4">
          <div className="flex justify-between items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarFallback className="bg-[#FFECD5] text-[#EA570B] text-sm font-semibold">
                {item.icon}
              </AvatarFallback>
            </Avatar>
            <p className="text-xs text-[#9ca3af] mt-1">{item.timeAgo}</p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#111827] truncate">{item.partner}</p>
            <p className="text-xs text-[#6b7280] mt-0.5">{item.action}</p>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onReview}
        className="flex-shrink-0 mt-4 bg-white hover:bg-[#f9fafb] text-[#111827] border-[#d1d5db] rounded-full px-4 py-1.5 text-xs font-medium h-auto w-full"
        aria-label={`Review ${item.partner} - ${item.action}`}
      >
        <div className="flex gap-2 items-center text-[#5B5651]">
          <CircleCheck className="h-4 w-4" />
          Review
        </div>
      </Button>
    </div>
  )
}

const NeedsApproval = () => {
  const { data: approvalItems, isLoading, error } = useApprovalItems()

  const handleApproveAll = () => {
    // TODO: Implement approve all functionality
  }

  const handleReview = (id: string) => {
    // TODO: Implement review functionality
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>Failed to load approval items</span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-[#FFFBEA] p-6 overflow-hidden relative border-1 !border-[#FDE58A]">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#FBBF24]" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-[#FEF4C6] p-1.5 sm:p-2 rounded-full border-1 !border-[#FDE58A]">
              <Info className="h-7 w-7 text-[#D87708]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">Needs Approval</h2>
              <p className="text-sm text-[#6b7280]">
                {isLoading ? 'Loading...' : `${approvalItems?.length || 0} requests pending your review`}
              </p>
            </div>
          </div>

        </div>
        <Button
          onClick={handleApproveAll}
          variant="outline"
          disabled={isLoading || !approvalItems?.length}
          className="text-[#D87708] hover:text-[#D87708] font-semibold px-6 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed text-sm h-auto whitespace-nowrap border-1 !border-[#FDE58A]"
          aria-label="Approve all pending requests"
        >
          APPROVE ALL
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 justify-between w-full">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-10 rounded-full" />
                </div>
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
              </div>
              <Skeleton className="h-6 w-full rounded-full mt-3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {approvalItems?.map((item) => (
            <ApprovalItemCard
              key={item.id}
              item={item}
              onReview={() => handleReview(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default NeedsApproval
