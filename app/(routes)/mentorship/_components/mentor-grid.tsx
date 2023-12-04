import MentorCard from "./mentor-card";
import { mentorCarouselData } from '@/data/mentor-carousel-data'

export default function MentorGrid(){
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-y-4 gap-x-3 mx-auto">
                {mentorCarouselData.map((mentors, index) => (
                    <MentorCard {...mentors} key={index}/>
                ))}
        </div>
    )
}