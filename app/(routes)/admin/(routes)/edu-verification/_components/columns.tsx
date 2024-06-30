"use client"

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DocumentType, VerificationStatus } from "@prisma/client"
import { FaRegFilePdf } from "react-icons/fa"
import Link from "next/link"
import { VerifyModal } from "./verify-modal"

export type Order = {
    id: string;
    educationId: string;
    documentType: DocumentType;
    documentUrl: string;
    status: VerificationStatus;
    closedAt: Date | null;
    remarks: string | null;
    education: {
      userId: string;
    }
};

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
        accessorKey: "documentType",
        header: "Document Type",
    },
    {
        accessorKey: "documentUrl",
        header: "Document",
        cell: ({ row }) => {
            const documentUrl = row.original.documentUrl;
            return (
                <Button className="bg-white hover:bg-white hover:brightness-75 shadow-md" asChild>
                    <Link href={documentUrl} target="_blank">
                        <FaRegFilePdf color="red" />
                    </Link>
                </Button>
            );
        }
    },
    {
        accessorKey: "status",
        header: "Verification Status",
        cell: ({ row }) => {
            const orderStatus = row.original.status;
            return orderStatus === "PENDING" ? (
                <Badge variant="pending">Pending</Badge>
            ) : orderStatus === "VERIFIED" ? (
                <Badge variant="completed">Verified</Badge>
            ) : orderStatus === "REJECTED" ? (
                <Badge variant="destructive">Rejected</Badge>
            ) : (
                <Badge variant="cancelled">Cancelled</Badge>
            )
        },
    },
    {
        accessorKey: "closedAt",
        header: "Closed At",
        cell: ({ row }) => row.getValue("closedAt") ? new Date(row.getValue("closedAt")).toLocaleString() : "N/A",
    },
    {
        accessorKey: "remarks",
        header: "Remarks",
        cell: ({ row }) => row.original.remarks?.length! > 0 ? row.original.remarks : "N/A",
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const order = row.original;
          const userId = row.original.education.userId;
          const [isModalOpen, setIsModalOpen] = useState(false);

          return (
            <>
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
                  <DropdownMenuItem 
                    className="text-green-700"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Verify Education
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">Delete Customer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <VerifyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userId={userId} />
            </>
          )
        },
    },
]
