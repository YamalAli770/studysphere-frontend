"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export type Mentor = {
    id: string;
    username: string;
    email: string;
    country: string;
    universityName: string;
    universityCountry: string;
    educationLevel: string;
    major: string;
    graduationYear: number;
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
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
              <Button
                className="hover:bg-gray-200"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "country",
        header: "Residence",
    },
    {
        accessorKey: "universityName",
        header: "University Name",
    },
    {
        accessorKey: "universityCountry",
        header: "University Country",
    },
    {
        accessorKey: "educationLevel",
        header: "Education Level",
    },
    {
        accessorKey: "major",
        header: "Major",
    },
    {
        accessorKey: "graduationYear",
        header: "Graduation Year",
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
]