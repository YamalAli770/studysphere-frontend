import MentorGrid from "./_components/mentor-grid"
import Pagination from "./_components/pagination"
import SearchFilter from "./_components/search-filter"
import  SearchInput  from "./_components/search-input"


export default function Mentorship() {
    return (
        <>
            <div className="py-24">
                <div className="container">
                    <div className="pb-24 flex justify-center">
                        <SearchInput/>
                    </div>
                    <div className="flex">
                        <SearchFilter/>
                        <MentorGrid/>
                    </div>
                    <div className="py-7 mt-12 border-t-2">
                        <Pagination />
                    </div>
                </div>
            </div>
        </>
    )
}