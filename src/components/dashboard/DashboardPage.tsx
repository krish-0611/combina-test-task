/**
 * DashboardPage Component
 * 
 * Main dashboard page that displays all key metrics and information.
 * This component orchestrates all dashboard sections in a responsive grid layout.
 * 
 * Layout Structure:
 * - Main Container (Red): Full width container with padding
 * - Inner Container (Green): Content area with grid layout
 * - Right Sidebar: User avatars section
 * 
 * @component
 */
import { Bell, ChevronDown, RefreshCw, Search, MoreVertical } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { Update } from '@/lib/api/mock-data'
import { useUpdates, useMetrics } from '@/hooks/useDashboardData'
import UserAvatars from './sections/UserAvatars'
import { Button } from '../ui/button'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'
import { DateRangePicker } from '../ui/date-picker'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useState } from 'react'
import NeedsApproval from './sections/NeedsApproval'
import StatsCards from './sections/StatsCards'
import ProgramGrowth from './sections/ProgramGrowth'
import PayoutsLastQuarter from './sections/PayoutsLastQuarter'
import PartnerFunnel from './sections/PartnerFunnel'

const UpdateCard = ({ update }: { update: Update }) => {
  return (
    <div className="flex-shrink-0 w-[200px] xs:w-[220px] sm:w-[240px] p-2 pr-3 bg-card border border-border rounded-full hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-2.5">
        <div className="flex-shrink-0 relative">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">
            {update.icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-bold text-foreground truncate leading-tight">{update.source}</p>
          <p className="text-[10px] xs:text-xs text-muted-foreground truncate leading-tight mt-0.5">{update.message}</p>
        </div>
        {/* Green dot indicator */}
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-success-foreground rounded-full flex-shrink-0" />
      </div>
    </div>
  )
}

const PartnersSection = () => {
  const { data: metrics, isLoading: metricsLoading } = useMetrics()
  const [activeTab, setActiveTab] = useState('overview')
  const [activeType, setActiveType] = useState('1')
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(2024, 9, 1)
  )
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(2024, 9, 31)
  )

  return (
    <div className="w-full h-full">
      <div className="bg-[#F8F8F6] w-full">
        {/* 8 Metric Cards */}
        <div className="px-4 sm:px-6 md:px-8 pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {metricsLoading ? (
              [...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-20 sm:h-14 rounded-b-none rounded-t-4xl" />
              ))
            ) : (
              metrics?.map((metric) => (
                <div
                  key={metric.id}
                  className={`
                    rounded-t-4xl px-4 py-1 sm:px-8 sm:py-2 transition-all cursor-pointer 
                    ${activeType === metric.id
                      ? 'bg-[#D1FF4B]'
                      : 'bg-transparent'
                    }
                  `}
                  onClick={() => setActiveType(metric.id)}
                  aria-label={`Select ${metric.label} metric`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveType(metric.id)
                    }
                  }}
                >
                  <div className="space-y-0.5">
                    <p className={`text-base font-semibold ${activeType === metric.id ? 'text-foreground' : 'text-[#8e93a1]'}`}>
                      {metric.label}
                    </p>
                    <p className={`text-xs text-muted-foreground `}>
                      {metric.value}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Border Separator */}
        <div className="border-b border-border mx-4 sm:mx-6 md:mx-8" />

        {/* Tabs Section */}
        <div className="px-4 sm:px-6 md:px-8 pt-4 pb-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-9 sm:h-10 bg-transparent rounded-full p-1 w-full sm:w-auto">
              <TabsTrigger
                value="overview"
                className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 data-[state=active]:bg-transparent rounded-none data-[state=active]:border-b-2 data-[state=active]:!border-foreground"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="database"
                className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 data-[state=active]:bg-transparent rounded-none data-[state=active]:border-b-2 data-[state=active]:!border-foreground"
              >
                Database
              </TabsTrigger>
              <TabsTrigger
                value="rebate-journey"
                className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 data-[state=active]:bg-transparent rounded-none data-[state=active]:border-b-2 data-[state=active]:!border-foreground"
              >
                Rebate Journey
              </TabsTrigger>
              <TabsTrigger
                value="contracts"
                className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 data-[state=active]:bg-transparent rounded-none data-[state=active]:border-b-2 data-[state=active]:!border-foreground"
              >
                Contracts
              </TabsTrigger>
              <TabsTrigger
                value="retailers"
                className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 data-[state=active]:bg-transparent rounded-none data-[state=active]:border-b-2 data-[state=active]:!border-foreground"
              >
                Retailers
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Navigation and Controls Bar */}
        <div className="px-4 sm:px-6 md:px-8 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
            {/* Left Section: Breadcrumb, Separator, Last Synced */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0 ">
              {/* Partners / Overview Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 sm:h-9 px-2 bg-card sm:px-3 text-xs sm:text-sm font-normal border border-border hover:bg-muted rounded-full"
                  >
                    Partners / Overview
                    <ChevronDown className="ml-1.5 h-3 w-3 sm:h-4 sm:w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem>Overview</DropdownMenuItem>
                  <DropdownMenuItem>Database</DropdownMenuItem>
                  <DropdownMenuItem>Rebate Journey</DropdownMenuItem>
                  <DropdownMenuItem>Contracts</DropdownMenuItem>
                  <DropdownMenuItem>Retailers</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator orientation="vertical" className="h-4 sm:h-5" />

              {/* Last Synced */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  Last synced: <span className="text-foreground font-medium">Just now</span>
                </span>
              </div>
            </div>
            {/* Search Input */}
            <div className="relative w-full lg:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search Partners..."
                className="pl-10 border-0 border-b border-border bg-transparent rounded-none h-9 sm:h-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-foreground transition-colors"
              />
            </div>

            {/* Right Section: Search, Date Picker, Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Date Range Picker */}
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onDateRangeChange={(start, end) => {
                  setStartDate(start)
                  setEndDate(end)
                }}
                className="h-9 sm:h-10"
              />
              <Separator orientation="vertical" className="h-4 sm:h-5" />
              {/* Filter, Export, More */}
              <div className="flex items-center ">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm rounded-full text-[#8e93a1]"
                >
                  Filter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm rounded-full text-[#8e93a1]"
                >
                  Export
                </Button>
              </div>
              <Separator orientation="vertical" className="h-4 sm:h-5" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 sm:h-10 w-9 sm:w-10 rounded-full"
                  >
                    <MoreVertical className="h-4 w-4 rotate-90 text-[#8e93a1]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>View Options</DropdownMenuItem>
                  <DropdownMenuItem>Help</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DashboardPage = () => {
  const { data: updates, isLoading: updatesLoading } = useUpdates()
  return (
    <div className="bg-[#F4F3F1] relative overflow-x-hidden">
      <div
        className="pointer-events-none absolute right-[-250px] top-[60px] z-0"
        aria-hidden="true"
      >
        <div
          className="w-[700px] h-[700px]"
          style={{
            background: 'radial-gradient(circle,rgba(252, 243, 225, 1) 0%, rgba(244, 243, 241, 1) 90%)',
          }}
        />
      </div>
      <div className="w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 h-full pt-8 z-1 relative">
        <div className="flex-1">
          <div className="flex flex-col gap-2">
            <div className="w-full px-0 sm:px-4 md:px-8">
              <div
                className="flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-4 w-full rounded-full bg-card border border-border overflow-hidden"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
              >
                {/* Header Section - Responsive */}
                <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0 border-r border-border px-2 sm:px-4 py-2 h-full">
                  <div className="bg-foreground p-1.5 sm:p-2 rounded-full">
                    <Bell className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-background" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] xs:text-xs font-bold text-foreground uppercase tracking-wide">LATEST</span>
                    <span className="text-[10px] xs:text-xs text-muted-foreground">Updates</span>
                  </div>
                </div>

                {/* Update Cards - Scrollable Area */}
                <ScrollArea className="flex-1 min-w-0">
                  <div className="flex gap-2 sm:gap-2.5 py-2 sm:py-3">
                    {updatesLoading ? (
                      [...Array(4)].map((_, i) => (
                        <div key={i} className="flex-shrink-0 w-[200px] xs:w-[220px] sm:w-[240px] p-2 bg-card border border-border rounded-full">
                          <div className="flex items-center gap-2.5">
                            <Skeleton className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex-shrink-0" />
                            <div className="flex-1 space-y-1 min-w-0">
                              <Skeleton className="h-3 w-20 sm:w-24 rounded-full" />
                              <Skeleton className="h-3 w-28 sm:w-36 rounded-full" />
                            </div>
                            <Skeleton className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full flex-shrink-0" />
                          </div>
                        </div>
                      ))
                    ) : updates && updates.length > 0 ? (
                      updates.map((update) => <UpdateCard key={update.id} update={update} />)
                    ) : (
                      <div className="flex items-center justify-center px-4 py-2">
                        <span className="text-xs text-muted-foreground">No updates available</span>
                      </div>
                    )}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                {/* Action Button - Responsive */}
                <Button
                  variant="ghost"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-background text-foreground rounded-full p-1.5 sm:p-2 ml-auto flex-shrink-0 border border-gray-50 shadow-sm"
                  aria-label="View more updates"
                >
                  <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
              </div>
            </div>
            <div className="w-full">
              <PartnersSection />
            </div>
          </div>

          {/* Main Content Section - Red Box Area */}

          <div className=" px-0 sm:px-4 md:px-8">
            <div className="flex gap-6 py-6">
              {/* Main Content Area - Left Side */}
              <div className="flex-1 space-y-6">
                {/* Needs Approval Section - Top */}
                <NeedsApproval />

                {/* Middle Row: Payouts and Partner Funnel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <PayoutsLastQuarter />
                  </div>
                  <div className="col-span-2">
                    <PartnerFunnel />
                  </div>
                </div>

                {/* Stats Cards Row */}
                <StatsCards />

                {/* Program Growth Section */}
                <ProgramGrowth />
              </div>

              {/* Right Sidebar - User Avatars (1 column) */}
              <div className="flex-shrink-0 hidden lg:block h-full">
                <UserAvatars />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
