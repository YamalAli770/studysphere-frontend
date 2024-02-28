"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FilterButton() {
  const onChange = (value: string) => {
    console.log(value);
  }
  return (
    <div className="flex items-center">
      <div className="text-sm mr-4 whitespace-nowrap">Filter by:</div>
      <Select onValueChange={onChange}>
        <SelectTrigger>
            <SelectValue placeholder="Pending" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="ACCEPTED">Accepted</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
