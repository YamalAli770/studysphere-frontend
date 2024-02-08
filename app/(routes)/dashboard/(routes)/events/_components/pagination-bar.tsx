import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

export default function PaginationBar() {
  return (
    <div className="flex justify-between">
        {/* Left */}
        <section className="flex gap-5 items-center">
            <h3 className="text-lg"><span>18</span> Mentors</h3>
            <span className="bg-gray-300 h-full w-1" />
            <p>Page <span>1/3</span></p>
        </section>
        {/* Right */}
        <section>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
    </div>
  )
}
