import { Button } from "@/components/ui/button"
import { ChevronDown, FileText, ListFilter } from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import CardList from "./_components/card-list"
import RevenueChart from "./_components/revenue-chart"
import TrafficChart from "./_components/traffic-chart"

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-7">
        {/* Top */}
        <section className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <span className="text-sm">Here's your analytical details</span>
          </div>
          <div className="flex gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-2 items-center bg-black text-white h-10 px-4 py-2 rounded-md text-sm"><FileText size={20} /> Exports<ChevronDown size={20} /></DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 mr-2">
                <DropdownMenuLabel>Download Report</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>.pdf</DropdownMenuItem>
                <DropdownMenuItem>.docx</DropdownMenuItem>
                <DropdownMenuItem>.xlsx</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="gap-2">
              <ListFilter size={20} />
              Filter by
            </Button>
          </div>
        </section>
        {/* Middle */}
        <section className="grid grid-cols-6">
          <CardList />
          <RevenueChart />
        </section>
        {/* Bottom */}
        <section>
          <TrafficChart />
        </section>
      </div>
    </div>
  )
}
