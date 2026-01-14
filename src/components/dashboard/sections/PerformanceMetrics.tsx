/**
 * PerformanceMetrics Component
 * 
 * Displays key performance indicators in a grid layout.
 * Includes tabs for navigation and a search/filter section.
 * 
 * @component
 */
import { Card, CardHeader } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Filter, Download, MoreVertical, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useMetrics } from '@/hooks/useDashboardData'
import { useState } from 'react'
import type { Metric } from '@/lib/api/mock-data'

/**
 * MetricCard Component
 * 
 * Individual metric display card.
 * 
 * @param {Metric} metric - The metric data to display
 */
const MetricCard = ({ metric }: { metric: Metric }) => {
  return (
    <div
      className={`
        p-3 sm:p-4 rounded-lg border transition-colors
        ${metric.highlight 
          ? 'bg-foreground/10 border-foreground/20' 
          : 'bg-card border-border hover:bg-muted/50'
        }
      `}
    > 
      <p className="text-xs sm:text-sm text-muted-foreground mb-1">{metric.label}</p>
      <p className={`text-lg sm:text-xl font-semibold ${metric.highlight ? 'text-foreground' : 'text-foreground'}`}>
        {metric.value}
      </p>
    </div>
  )
}

const PerformanceMetrics = () => {
  const { data: metrics, isLoading, error } = useMetrics()
  const [mainTab, setMainTab] = useState('overview')
  const [subTab, setSubTab] = useState('partners')

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4">
          {/* Metrics Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="p-3 sm:p-4 rounded-lg border">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-sm text-muted-foreground p-4">Failed to load metrics</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {metrics?.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
            </div>
          )}

          {/* First Tabs Navigation - Main */}
          <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
            <TabsList className="w-full justify-start bg-muted">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="rebate-journey">Rebate Journey</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
              <TabsTrigger value="retailers">Retailers</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Second Tabs Navigation - Sub */}
          <Tabs value={subTab} onValueChange={setSubTab} className="w-full">
            <TabsList className="w-full justify-start bg-muted">
              <TabsTrigger value="partners">Partners</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="text-sm text-muted-foreground">Partners / Overview</div>
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                Last synced: Just now
              </Badge>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Partners..."
                  className="pl-8 h-9 text-sm w-full sm:w-[200px]"
                />
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">Oct 1 - Oct 31</div>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Download className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View All</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default PerformanceMetrics
