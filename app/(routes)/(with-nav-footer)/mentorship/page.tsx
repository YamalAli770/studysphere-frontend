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
                        <div className="md:2/12 lg:w-3/12 min-w-max">
                            <SearchFilter/>
                        </div>
                        <div className="md:10/12 lg:w-9/12">
                            <MentorGrid/>
                        </div>
                    </div>
                    <div className="py-7 mt-12 border-t-2">
                        <Pagination />
                    </div>
                </div>
            </div>
        </>
    )
}