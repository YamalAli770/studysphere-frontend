import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        <section className="flex bg-primary rounded-md">
            <Button variant="pagination">
                <ChevronLeft />
            </Button>
            <div className="flex">
                <Button variant="pagination">1</Button> 
                <Button variant="pagination">2</Button> 
                <Button variant="pagination">3</Button> 
            </div>
            <Button variant="pagination">
                <ChevronRight />
            </Button>
        </section>
    </div>
  )
}
