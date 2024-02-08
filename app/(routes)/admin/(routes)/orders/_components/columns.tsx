"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export type Order = {
    id: string;
    orderStatus: "pending" | "completed" | "disputed" | "cancelled";
    amount: string;
    orderDate: number;
    paymentMethod: "PayPal" | "Credit Card" | "Apple Pay" | "Google Pay";
    paymentDate: number;
    paymentStatus: "pending" | "escrow" | "paid";
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
        accessorKey: "orderStatus",
        header: "Order Status",
        cell: ({ row }) => {
            return row.getValue("orderStatus") === "pending" ? (
                <Badge variant="pending">Pending</Badge>
            ) : row.getValue("orderStatus") === "completed" ? (
                <Badge variant="completed">Completed</Badge>
            ) : row.getValue("orderStatus") === "disputed" ? (
                <Badge variant="disputed">Disputed</Badge>
            ) : (
                <Badge variant="cancelled">Cancelled</Badge>
            )
        },
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "orderDate",
        header: ({ column }) => {
          return (
            <Button
              className="hover:bg-gray-200"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Order Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
      },
    },
    {
        accessorKey: "paymentMethod",
        header: "Payment Method",
    },
    {
        accessorKey: "paymentDate",
        header: "Payment Date",
    },
    {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        cell: ({ row }) => {
            return row.getValue("paymentStatus") === "pending" ? (
                <Badge variant="pending">Pending</Badge>
            ) : row.getValue("paymentStatus") === "escrow" ? (
                <Badge variant="escrow">Escrow</Badge>
            ) : (
                <Badge variant="paid">Paid</Badge>
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