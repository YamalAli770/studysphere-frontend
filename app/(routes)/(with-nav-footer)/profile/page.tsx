import { Separator } from "@/components/ui/separator";
import ProfileDetails from "./_components/profile-details";
import ReviewCard from "./_components/review-card";


export default function Profile(){
    return (
        <div className="py-24">
            <div className="container">
                <ProfileDetails/>
                <Separator className="my-10"/>
                <div className="flex space-x-10">
                    <div className="w-2/3">
                        <div className="rounded-md shadow-md p-8 border border-secondary">
                            <h3 className="text-xl font-semibold ">About Me</h3>
                            <Separator className="my-5"/>
                            <p>
                            As someone who has successfully embarked on their own international academic adventure, I understand the myriad of questions and uncertainties that can accompany the desire to study in a foreign land. My mission is to make this transformative experience accessible to students like you by offering personalized guidance tailored to your unique aspirations and circumstances.
                            <br /><br />Guiding fellow students through the intricate process of studying abroad isn&apos;t just a service for me; it&apos;s a calling. I find immense joy and fulfillment in demystifying the complexities of applications, scholarships, and cultural adjustments. My approach is not just about providing information but about building a supportive and empowering relationship with each student I work with.
                            </p>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <ReviewCard/>
                    </div>
                </div>
            </div>
        </div>
    )
}