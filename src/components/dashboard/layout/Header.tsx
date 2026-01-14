import { Menu, Search, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const Header = () => {
    return (
        <header className=" bg-[#F9F7F5]">
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 sm:py-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
                    {/* Left Section */}
                    <div className="flex flex-col gap-1.5 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                            <Menu 
                              className="h-5 w-5 text-foreground hover:bg-muted cursor-pointer flex-shrink-0" 
                              aria-label="Open menu"
                              role="button"
                              tabIndex={0}
                            />
                            <Separator orientation="vertical" className="h-3 w-0.5 text-foreground shrink-0 bg-border hidden sm:block"></Separator>
                            <Breadcrumb className="min-w-0">
                                <BreadcrumbList className="flex items-center gap-1 sm:gap-1.5">
                                    <BreadcrumbItem className="min-w-0">
                                        <BreadcrumbLink
                                            href="/dashboard"
                                            className="text-muted-foreground text-xs sm:text-sm hover:text-foreground transition-colors truncate"
                                        >
                                            Dashboard
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="text-muted-foreground">
                                        <span className="text-muted-foreground">&gt;</span>
                                    </BreadcrumbSeparator>
                                    <BreadcrumbItem className="min-w-0">
                                        <BreadcrumbPage className="text-foreground text-xs sm:text-sm truncate">
                                            Overview
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl leading-tight sm:leading-[30px] md:leading-[34px] tracking-tight">
                            Welcome back, Combina
                        </h1>
                    </div>

                    {/* Center Section - Search Bar */}
                    <div className="w-full lg:flex-1 lg:max-w-md lg:mx-4 flex-shrink-0">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            <Input
                                type="search"
                                placeholder="Search across campaigns, partners, or assets..."
                                className="pl-10 border-0 border-b border-border bg-transparent rounded-none h-9 sm:h-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 sm:gap-3 justify-end min-w-0 flex-shrink-0">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 flex-shrink-0 bg-muted"
                          aria-label="Print page"
                        >
                            <Printer className="h-3 w-3 text-foreground" />
                        </Button>
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <Badge
                                variant="outline"
                                className="bg-card text-foreground border-border rounded-full px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-normal h-auto whitespace-nowrap"
                            >
                                NAME:<span className="font-bold pl-0.5 sm:pl-1">Velto</span> 
                            </Badge>
                            <Badge
                                variant="outline"
                                className="bg-card text-foreground border-border rounded-full px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-normal h-auto whitespace-nowrap"
                            >
                                ID:<span className="font-bold pl-0.5 sm:pl-1">5732</span> 
                            </Badge>
                            <Badge
                                variant="success"
                                className="rounded-full px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-normal h-auto whitespace-nowrap bg-[#EAFEF6] text-[#1B9A6D]"
                            >
                                STATUS:<span className="font-bold pl-0.5 sm:pl-1">In progress</span> 
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header