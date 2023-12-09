import MentorCard from "./mentor-card";
import { mentorCarouselData } from '@/data/mentor-carousel-data'

export default function MentorGrid(){
    return (
        <div className="grid grid-cols-2  md:grid-cols-3 grid-rows-4 md:grid-rows-3 gap-y-8 gap-x-3">
                {mentorCarouselData.map((mentors, index) => (
                    <MentorCard {...mentors} key={index}/>
                ))}
        </div>
    )
}