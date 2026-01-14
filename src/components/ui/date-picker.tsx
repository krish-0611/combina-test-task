import * as React from "react"
import type { DateRange } from "react-day-picker"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DatePickerProps {
    date?: Date
    onDateChange?: (date: Date | undefined) => void
    className?: string
}

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }

    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

export function DatePicker({ date, onDateChange, className }: DatePickerProps) {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)

    React.useEffect(() => {
        if (date) {
            setSelectedDate(date)
        }
    }, [date])

    const handleDateSelect = (newDate: Date | undefined) => {
        setSelectedDate(newDate)
        onDateChange?.(newDate)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "h-9 px-3 justify-between text-left font-normal border border-border rounded-md bg-background hover:bg-muted",
                        !selectedDate && "text-muted-foreground",
                        className
                    )}
                >
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                            {selectedDate ? formatDate(selectedDate) : "Pick a date"}
                        </span>
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

function formatDateRange(from: Date | undefined, to: Date | undefined) {
    if (!from && !to) {
        return ""
    }
    if (from && to) {
        return `${formatDate(from)} - ${formatDate(to)}`
    }
    if (from) {
        return `${formatDate(from)} - ...`
    }
    return ""
}

function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

interface DateRangePickerProps {
    startDate?: Date
    endDate?: Date
    onDateRangeChange?: (start: Date | undefined, end: Date | undefined) => void
    className?: string
}

export function DateRangePicker({
    startDate,
    endDate,
    onDateRangeChange,
    className,
}: DateRangePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [range, setRange] = React.useState<DateRange | undefined>(
        startDate && endDate ? { from: startDate, to: endDate } : undefined
    )
    const [month, setMonth] = React.useState<Date | undefined>(
        startDate || new Date()
    )
    const [value, setValue] = React.useState(
        formatDateRange(startDate, endDate)
    )

    React.useEffect(() => {
        if (startDate && endDate) {
            const newRange = { from: startDate, to: endDate }
            setRange(newRange)
            setValue(formatDateRange(startDate, endDate))
            setMonth(startDate)
        } else if (!startDate && !endDate) {
            setRange(undefined)
            setValue("")
        }
    }, [startDate, endDate])

    const handleDateSelect = (newRange: DateRange | undefined) => {
        setRange(newRange)
        const formatted = formatDateRange(newRange?.from, newRange?.to)
        setValue(formatted)
        onDateRangeChange?.(newRange?.from, newRange?.to)

        // Close popover when both dates are selected
        if (newRange?.from && newRange?.to) {
            setOpen(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        // Try to parse the input as a date range
        // This is a simple implementation - you might want to enhance this
        const parts = e.target.value.split(" - ")
        if (parts.length === 2) {
            const fromDate = new Date(parts[0])
            const toDate = new Date(parts[1])
            if (isValidDate(fromDate) && isValidDate(toDate)) {
                const newRange = { from: fromDate, to: toDate }
                setRange(newRange)
                setMonth(fromDate)
                onDateRangeChange?.(fromDate, toDate)
            }
        }
    }

    return (
        <div className={cn("relative flex gap-2", className)}>
            <Input
                value={value}
                placeholder="Oct 1, 2024 - Oct 31, 2024"
                className="bg-background pr-10 h-9 sm:h-10 text-sm"
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                        e.preventDefault()
                        setOpen(true)
                    }
                }}
            />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2 h-6 w-6 p-0"
                    >
                        <CalendarIcon className="size-3.5" />
                        <span className="sr-only">Select date range</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-120 overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                >
                    <Calendar
                        mode="range"
                        selected={range}
                        captionLayout="dropdown"
                        classNames={{
                            root: "w-full",
                        }}
                        month={month}
                        onMonthChange={setMonth}
                        numberOfMonths={2}
                        onSelect={handleDateSelect}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
