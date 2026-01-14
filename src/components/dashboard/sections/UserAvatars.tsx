/**
 * UserAvatars Component
 * 
 * Displays a vertical scrollable list of user avatars with badges.
 * Shows team members in the right sidebar.
 * 
 * This is the RED PART - Right sidebar with user avatars
 * 
 * @component
 */
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useUsers } from '@/hooks/useDashboardData'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
const UserAvatars = () => {
  const { data: users, isLoading, error } = useUsers()

  return (
    <div className="w-full h-full">
      {/* Red Part - Main Container for User Avatars Sidebar */}
      <div className="">
        <ScrollArea className="h-full w-full">
          <div className="flex flex-col items-center gap-4 py-4 px-2 border !border-[white] rounded-full !bg-[#F5F0E9]">
            {/* Action Button - Responsive */}
            <Button
              variant="ghost"
              className="w-8 h-8 sm:w-10 sm:h-10 bg-background text-foreground rounded-full p-1.5 sm:p-2 flex-shrink-0 border-gray-50 shadow-sm"
              aria-label="View more users"
            >
              <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
            </Button>
            {isLoading ? (
              <>
                {[...Array(11)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-12 rounded-full" />
                ))}
              </>
            ) : error ? (
              <div className="text-sm text-muted-foreground p-4 text-center">
                Failed to load users
              </div>
            ) : (
              users?.map((user) => (
                <div key={user.id} className="relative group cursor-pointer !border-[white] border-2 rounded-[13px]">
                  <Avatar className="h-10 w-10 hover:border-foreground transition-colors rounded-[13px]">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-muted text-foreground">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {user.badge && (
                    <Badge
                      variant="default"
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-semibold bg-[#D4F886] text-black border-2 !border-[white] shadow-sm"
                    >
                      {user.badge}
                    </Badge>
                  )}
                </div>
              ))
            )}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  )
}

export default UserAvatars
