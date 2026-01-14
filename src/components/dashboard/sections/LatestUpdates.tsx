/**
 * LatestUpdates Component
 * 
 * Displays a horizontal scrollable list of latest updates/notifications.
 * Each update card shows an icon, source, and message preview.
 * 
 * @component
 */
import { Bell } from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useUpdates } from '@/hooks/useDashboardData'
import type { Update } from '@/lib/api/mock-data'

/**
 * UpdateCard Component
 * 
 * Individual update card displaying source icon, name, and message.
 * 
 * @param {Update} update - The update data to display
 */
const UpdateCard = ({ update }: { update: Update }) => {
  return (
    <Card className="flex-shrink-0 w-[280px] sm:w-[300px] p-4 bg-card border-border hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">
          {update.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{update.source}</p>
          <p className="text-xs text-muted-foreground truncate">{update.message}</p>
        </div>
      </div>
    </Card>
  )
}

const LatestUpdates = () => {
  const { data: updates, isLoading, error } = useUpdates()

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="h-4 w-4 text-foreground" />
        <h2 className="text-sm font-semibold text-foreground">LATEST Updates</h2>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="flex-shrink-0 w-[280px] sm:w-[300px] p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </Card>
              ))}
            </>
          ) : error ? (
            <div className="text-sm text-muted-foreground p-4">Failed to load updates</div>
          ) : (
            updates?.map((update) => <UpdateCard key={update.id} update={update} />)
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default LatestUpdates
