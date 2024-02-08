"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export type Dispute = {
    id: string;
    filedBy: string;
    orderId: string;
    reason: string;
    disputeDate: number;
    disputeStatus: "pending" | "resolved";
}

export const columns: ColumnDef<Dispute>[] = [
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
        accessorKey: "filedBy",
        header: "Filed By",
    },
    {
        accessorKey: "orderId",
        header: "Order ID",
    },
    {
        accessorKey: "reason",
        header: "Reason",
    },
    {
        accessorKey: "disputeDate",
        header: ({ column }) => {
            return (
              <Button
                className="hover:bg-gray-200"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Dispute Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "disputeStatus",
        header: "Dispute Status",
        cell: ({ row }) => {
            return row.getValue("disputeStatus") === "pending" ? (
                <Badge variant="pending">Pending</Badge>
            ) : (
                <Badge variant="completed">Resolved</Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const dispute = row.original
     
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
                  onClick={() => navigator.clipboard.writeText(dispute.id)}
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