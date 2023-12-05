import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchInput() {
    return (
        <div className="relative w-full md:w-10/12 lg:w-9/12">
            <input type="text" className="p-5 w-full bg-secondary rounded-[4px]" placeholder="Search Mentors..."/>
            <span className="absolute top-[11px] right-[20px]">
                <Button variant="default" className="w-12">
                        <Search />
                </Button>
            </span>
        </div>
    )
}