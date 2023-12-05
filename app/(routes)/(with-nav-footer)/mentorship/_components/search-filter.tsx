import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SearchFilter(){
    return(
        <div className="w-1/6">
            <p className="text-xl mb-5">FILTERS</p>
            <hr />
            <div className="my-5">
                <p className="mb-4">Country</p>
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="us"/>
                        <label
                            htmlFor="us"
                            className="text-sm"
                        >
                            United States
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="germany"/>
                        <label
                            htmlFor="germany"
                            className="text-sm"
                        >
                            Germany
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="france"/>
                        <label
                            htmlFor="france"
                            className="text-sm"
                        >
                            France
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="canada"/>
                        <label
                            htmlFor="canada"
                            className="text-sm"
                        >
                            Canada
                        </label>
                    </div>
                </div>
            </div>
            <hr />
            <div className="my-5">
                <p className="mb-4">Currently Enrolled</p>
                <RadioGroup className="space-y-2" defaultValue="doesnotmatter">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="r1"/>
                        <label htmlFor="r1" className="text-sm">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="r2"/>
                        <label htmlFor="r2" className="text-sm">No</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="doesnotmatter" id="r3"/>
                        <label htmlFor="r3" className="text-sm">Doesn,t matter</label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}