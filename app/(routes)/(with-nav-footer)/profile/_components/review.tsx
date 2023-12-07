import Image from "next/image";
import { Star } from "lucide-react";

export default function Review(){
    return(
        <div>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3">
                    <span className="w-9 h-9 relative overflow-hidden rounded-full">
                        <Image
                        src={"/testimonial/testimonial-1.jpg"}
                        fill={true}
                        style={{objectFit:"cover"}}
                        alt={"review-profile-photo"}>
                        </Image>
                    </span>
                    <p className="font-semibold">Aisha Khan</p>
                </div>
                <div className="flex text-teal-400">
                    <Star fill="currentColor" size={16}/>
                    <Star fill="currentColor" size={16}/>
                    <Star fill="currentColor" size={16}/>
                    <Star fill="currentColor" size={16}/>
                    <Star  size={16}/>
                </div>
            </div>
            <div className="text-sm text-gray-500">
                StudySphere has revolutionized how I connect with mentees. The platform&#44;s intuitive design and diverse community make mentorship meaningful and enjoyable. It&#44;s a privilege to guide the next generation of global learners.
            </div>
        </div>
    )
}