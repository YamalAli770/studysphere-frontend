"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export type Mentor = {
  id: string,
  name: string | null,
  email: string | null,
  image: string | null,
  bio: string | null,
  education: {
    institution: string,
    country: string,
    level: string,
    major: string,
    isVerified: boolean,
    startYear: number,
    endYear: number,
  } | null,
}

export const columns: ColumnDef<Mentor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="data-[state=checked]:bg-black data-[state=checked]:border-black"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="data-[state=checked]:bg-black data-[state=checked]:border-black"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        className="hover:bg-gray-200"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "education.institution",
    header: "University Name",
  },
  {
    accessorKey: "education.country",
    header: "University Country",
  },
  {
    accessorKey: "education.level",
    header: "Education Level",
  },
  {
    accessorKey: "education.major",
    header: "Major",
  },
  {
    accessorKey: "education.endYear",
    header: "Graduation Year",
  },
  {
    accessorKey: "education.isVerified",
    header: "Verified",
    cell: ({ row }) => {
      const isVerified = row.original.education?.isVerified;
      return isVerified ? (
        <Badge variant="completed">Yes</Badge>
      ) : (
        <Badge variant="destructive">No</Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mentor = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(mentor.id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">Delete Customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
