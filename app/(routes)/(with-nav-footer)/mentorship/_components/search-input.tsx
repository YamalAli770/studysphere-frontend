import { Button } from "@/components/ui/button"

export default function SearchInput() {
    return (
        <label htmlFor="Search" className="relative w-full md:w-10/12 lg:w-9/12">
            <input type="text" className="p-5 w-full bg-secondary rounded-[4px]" placeholder="Search"/>
            <span className="absolute top-[11px] right-[20px]">
                <Button variant="default" className="w-12">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                </Button>
                
            </span>
        </label>
    )
}