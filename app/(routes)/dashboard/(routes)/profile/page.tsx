"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import VerificationModal from "./_components/verification-modal";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

export default function Profile() {
  const session = useSessionContext();
  return (
    <div className="p-6">
      <div className="flex flex-col gap-7">
        {/* Top */}
        <section className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Profile Settings</h1>
            <p>Customize your personal details</p>
          </div>
          { !session.loading && session.accessTokenPayload.accountType === "mentor" && <VerificationModal />}
        </section>
        {/* Middle */}
        <section className="flex flex-col gap-4">
          {/* Profile Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="https://ucarecdn.com/5a2e1064-794b-413e-866d-5f8ade379174/-/preview/500x500/-/quality/smart_retina/-/format/auto/" alt="profile" width={120} height={120} className="rounded-full" />
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">Yamal Ali</h2>
                <p className="text-sm">MSc. Software Engineering At University of Augsburg</p>
              </div>
            </div>
            <Button>Edit Profile</Button>
          </div>
          {/* Profile Details */}
          <div className="flex flex-col gap-7 mt-4">
            <Separator />
            {/* Name Info */}
            <section className="flex flex-col gap-5">
              <h2 className="w-fit font-semibold">Personal Information</h2>
              <div className="grid grid-cols-3 gap-x-10 gap-y-5">
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="username">Username</Label>
                  <div className="border p-2 rounded-md text-sm">yamalali770</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="firstName">First Name</Label>
                  <div className="border p-2 rounded-md text-sm">Yamal</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="lastname">Last Name</Label>
                  <div className="border p-2 rounded-md text-sm">Ali</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="email">Email</Label>
                  <div className="border p-2 rounded-md text-sm">yamalali770@gmail.com</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="email">Phone Number</Label>
                  <div className="border p-2 rounded-md text-sm">+92-300-7873494</div>
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
                  <div className="border p-2 rounded-md text-sm">NED University Of Engineering & Technology</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="universityCountry">University Country</Label>
                  <div className="border p-2 rounded-md text-sm">Pakistan</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="educationLevel">Education Level</Label>
                  <div className="border p-2 rounded-md text-sm">Bachelor's</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="major">Major</Label>
                  <div className="border p-2 rounded-md text-sm">Software Engineering</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="graduationYear">Graduation Year</Label>
                  <div className="border p-2 rounded-md text-sm">2023</div>
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
          </div>
        </section>
      </div>
    </div>
  )
}
