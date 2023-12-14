import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Review from "./review";

export default function ReviewCard() {
    return(
        <div className="rounded-md shadow-md p-8 border border">
            <h3 className="text-xl font-semibold mb-5">Reviews &#40;128&#41;</h3>
            <Separator className="my-5"/>
            <div className="flex flex-col space-y-10">
                <Review/>
                <Review/>
                <Review/>
            </div>
            <div className="text-center mt-2"> 
                <Button variant={"ghost"}>See More</Button>
            </div>
        </div>
    )
}