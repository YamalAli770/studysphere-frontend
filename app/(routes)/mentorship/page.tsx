import MentorGrid from "./_components/mentor-grid"
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
                </div>
            </div>
        </>
    )
}