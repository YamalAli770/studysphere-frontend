"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { OrderStatus } from "@prisma/client"

export type Order = {
  id: string;
  status: OrderStatus,
  createdAt: Date,
  updatedAt: Date,
  meetupRequest: {
    mentee: {
      email: string | null,
    },
    mentor: {
      email: string | null,
    }
  }
}

export const columns: ColumnDef<Order>[] = [
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
        accessorKey: "meetupRequest.mentee.email",
        header: "Mentee",
    },
    {
        accessorKey: "meetupRequest.mentor.email",
        header: "Mentor",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleString(),
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => new Date(row.getValue("updatedAt")).toLocaleString(),
    },
    {
        accessorKey: "orderStatus",
        header: "Order Status",
        cell: ({ row }) => {
            const orderStatus = row.original.status;
            return orderStatus === "PENDING" ? (
                <Badge variant="pending">Pending</Badge>
            ) : orderStatus === "COMPLETED" ? (
                <Badge variant="completed">Completed</Badge>
            ) : orderStatus === "DISPUTED" ? (
                <Badge variant="disputed">Disputed</Badge>
            ) : (
                <Badge variant="cancelled">Cancelled</Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const order = row.original
     
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
                  onClick={() => navigator.clipboard.writeText(order.id)}
                >
                  Copy Order ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">Delete Customer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]