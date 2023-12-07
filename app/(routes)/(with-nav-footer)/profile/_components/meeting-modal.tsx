"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "./date-picker";

export default function MeetingModal(){
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"default"}>Meet Up</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Schedule Meeting</DialogTitle>
                <DialogDescription>
                    Feel free to send meeting request
                </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-6 py-6">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Date" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">12:00 PM UTC</SelectItem>
                            <SelectItem value="dark">5:00 PM UTC</SelectItem>
                            <SelectItem value="system">10:00 PM UTC</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex space-x-6">
                            <Select>
                                <SelectTrigger className="w-1/3">
                                    <SelectValue placeholder="Select Time" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">12:00 PM UTC</SelectItem>
                                    <SelectItem value="dark">5:00 PM UTC</SelectItem>
                                    <SelectItem value="system">10:00 PM UTC</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-1/3">
                                    <SelectValue placeholder="Time Span" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="20">20 min</SelectItem>
                                    <SelectItem value="40">40 min</SelectItem>
                                    <SelectItem value="60">60 min</SelectItem>
                                    <SelectItem value="80">80 min</SelectItem>
                                    <SelectItem value="100">100 min</SelectItem>
                                </SelectContent>
                            </Select>
                        <div className="flex space-x-2 items-center px-4 py-2 rounded-md bg-secondary w-1/3">
                            <h3 className="text-xl flex items-center space-x-2 font-semibold text-teal-400">
                                <p>0.4 $</p>
                            </h3>
                            <p className="text-sm text-teal-800">/ min</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                        <div className="flex space-x-2 items-center px-4 py-2 rounded-md bg-secondary">
                            <h3 className="text-xl flex items-center space-x-2 font-semibold text-teal-400">
                                <p>8 $</p>
                            </h3>
                            <p className="text-sm text-teal-800">Total</p>
                        </div>
                    <Button variant={"default"}>Send Request</Button>                
                </div>
            </DialogContent>
        </Dialog>
    )
}