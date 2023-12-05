import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";

export default function SearchFilter(){
    return(
        <div className="bg-secondary-bg p-6 w-2/6">
            <p className="text-xl mb-5">FILTERS</p>
            <Separator />
            <div className="my-5">
                <p className="mb-4">Country</p>
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="us"/>
                        <Label
                            htmlFor="us"
                            className="text-sm"
                        >
                            United States
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="germany"/>
                        <Label
                            htmlFor="germany"
                            className="text-sm"
                        >
                            Germany
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="france"/>
                        <Label
                            htmlFor="france"
                            className="text-sm"
                        >
                            France
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="canada"/>
                        <Label
                            htmlFor="canada"
                            className="text-sm"
                        >
                            Canada
                        </Label>
                    </div>
                </div>
            </div>
            <Separator />
            <div className="my-5">
                <p className="mb-4">Currently Enrolled</p>
                <RadioGroup className="space-y-2" defaultValue="doesnotmatter">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="r1"/>
                        <Label htmlFor="r1" className="text-sm">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="r2"/>
                        <Label htmlFor="r2" className="text-sm">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="doesnotmatter" id="r3"/>
                        <Label htmlFor="r3" className="text-sm">Doesn't matter</Label>
                    </div>
                </RadioGroup>
            </div>
            <Separator />
            <div className="my-5">
                <div className="flex justify-between">
                    <p className="mb-4">Rating</p>
                    <span>5</span>
                </div>
                <div className="flex">
                    <Star fill="white" color="white" />
                    <Star fill="white" color="white" />
                    <Star fill="white" color="white" />
                    <Star fill="white" color="white" />
                    <Star fill="white" color="white" />
                </div>
            </div>
            <Separator />
            <div className="my-5">
                <div className="flex justify-between">
                    <p className="mb-4">Price</p>
                    <span>$5</span>
                </div>
                <Slider />
            </div>
        </div>
    )
}