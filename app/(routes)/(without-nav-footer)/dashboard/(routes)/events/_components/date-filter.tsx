"use client"


import {CalendarIcon} from "lucide-react";
import * as React from "react";
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export function DateFilter() {
  const [date, setDate] = React.useState<Date>();

  const resetDate = () => {
    setDate(undefined);
  }

  return (
    <div className="flex items-center">
        {date && (<Button className="me-2" variant={'ghost'} onClick={resetDate}>X</Button>)}
        <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={date ? "default" : "outline"}
                className={cn(
                    "justify-start text-left font-normal"
                    )}
                    >
                <CalendarIcon className="mr-2 h-4 w-4"/>
                {date ? format(date, "PPP") : <span>Filter By Date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled = {(date) => date < new Date()}
                initialFocus
                />
            </PopoverContent>
        </Popover>
    </div>
  )
}
