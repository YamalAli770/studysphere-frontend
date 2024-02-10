"use client";

import { useMemo, useState } from "react";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent,SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

import countries from "i18n-iso-countries";
// Import the languages to use
import enLocale from "i18n-iso-countries/langs/en.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Register the languages
countries.registerLocale(enLocale);

export default function OnBoarding() {
  const countryObj = countries.getNames("en", { select: "alias" });
  const countryArray = useMemo(() => {
    return Object.entries(countryObj).map(([key, value]) => ({
      label: value,
      value: key
    }))
  }, []);

  const [value, setValue] = useState()
  return (
    <div>
        {/* Top */}
        <section className='p-6 flex items-center gap-1'>
            <Image src="/logo.png" alt="Study Sphere Logo" width={50} height={50} />
            <h2 className="text-2xl">Study <span className="text-accent-text">Sphere</span></h2>
        </section>
        {/* Bottom */}
        {/* Profile Details */}
        <div className="flex flex-col p-6 pt-0 gap-7">
            <Separator />
            {/* Name Info */}
            <section className="flex flex-col gap-5">
              <h2 className="w-fit font-semibold">Personal Information</h2>
              <div className="grid grid-cols-3 gap-x-10 gap-y-5">
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="username">Username</Label>
                  <Input className="border p-2 rounded-md text-sm" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="firstName">First Name</Label>
                  <Input className="border p-2 rounded-md text-sm" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="lastname">Last Name</Label>
                  <Input className="border p-2 rounded-md text-sm" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="email">Email</Label>
                  <div className="border p-2 rounded-md text-sm cursor-not-allowed">yamalali770@gmail.com</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="email">Phone Number</Label>
                  <PhoneInput placeholder="Enter phone number" value={value} onChange={() => setValue} defaultCountry={"PK"} />
                </div>
              </div>
            </section>
            <Separator />
            {/* Educational Information */}
            <section className="flex flex-col gap-5">
              <h2 className="w-fit font-semibold">Educational Credentials</h2>
              <div className="grid grid-cols-3 gap-x-10 gap-y-5">
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="universityName">University Name</Label>
                  <Input className="border p-2 rounded-md text-sm" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="universityCountry">University Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Country Of Educational Institution" />
                    </SelectTrigger>
                    <SelectContent>
                      { countryArray.map((country) => (
                        <SelectItem value={country.value}>{country.label}</SelectItem>
                      )) }
                      {/* <SelectItem value="high-school">High School</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="educationLevel">Education Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Level Of Education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="bachelor">Bachelor</SelectItem>
                      <SelectItem value="master">Master</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="major">Major</Label>
                  <Input className="border p-2 rounded-md text-sm" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="graduationYear">Graduation Year</Label>
                  <input type="date" className="border p-2 rounded-md text-sm" />
                </div>
              </div>
            </section>
            <Separator />
            {/* User Bio & Tagline */}
            <section className="flex flex-col gap-5">
              <h2 className="w-fit font-semibold">Your Bio</h2>
              <div className="flex flex-col gap-2">
                <Textarea className="w-2/3 h-44" placeholder="Add a short bio..." />
                <span className="text-sm text-gray-500">400 characters left</span>
              </div>
            </section>
            <Button className="flex w-fit self-end"><Link href="/dashboard/profile">Save & Continue</Link></Button>
          </div>
    </div>
  )
}
