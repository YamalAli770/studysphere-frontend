import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import VerificationModal from "./_components/verification-modal";
//import React, { useState, useEffect } from 'react';
import EducationModal from "./_components/education-modal";
import { currentUserServer } from "@/lib/user-server";
import { getEducationByUserIdAction } from "@/actions/education";
import { Badge } from "@/components/ui/badge";
//import { addUserStripeInfoAction, getStripeInfo } from "@/actions/subscription";

export default async function Profile() {
  const user = await currentUserServer();
  let education;
  if(user) {
    education = await getEducationByUserIdAction(user.id);
  }
  // const [stripeId, setStripeId] = useState<string>('');
  // const [amount, setAmount] = useState<number>(0);

  // useEffect(() => {
  //   const fetchStripeInfo = async () => {
  //     try {
  //       if (user) {
  //         console.log(user)
  //         const response = await getStripeInfo();
  //         console.log(response);
  //         if (response) {
  //           setStripeId(response.stripeId);
  //         }
  //         else {
  //           setAmount(response.amount);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching information:', error);
  //     }
  //   };
  //   fetchStripeInfo();
  // }, [user]);



  // const handleStripeIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setStripeId(event.target.value);
  // };

  // const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAmount(parseInt(event.target.value));
  // };

  // Function to handle saving information
  // const saveInfo = async () => {
  //   console.log(stripeId,amount)
  //   // // Call API to save information using stripeId and amount
  //   // try {
  //   //   // Example API call
  //   //   const response = await addUserStripeInfoAction(stripeId,amount)

  //   // } catch (error) {
  //   //   console.error('Error saving information:', error);
  //   //   // Handle error
  //   // }
  // };



  return (
    <div className="p-6">
      <div className="flex flex-col gap-7">
        {/* Top */}
        <section className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Profile Settings</h1>
            <p>Customize your personal details</p>
          </div>
          <div className="flex gap-3">
            { !education &&  <EducationModal />}
            { education && !education.isVerified && <VerificationModal />}
          </div>
        </section>
        {/* Middle */}
        <section className="flex flex-col gap-4">
          {/* Profile Details */}
          <div className="flex flex-col gap-7 mt-4">
            <Separator />
            {/* Name Info */}
            <section className="flex flex-col gap-5">
              <h2 className="w-fit font-semibold">Personal Information</h2>
              <div className="grid grid-cols-3 gap-x-10 gap-y-5">
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="username">Name</Label>
                  <div className="border p-2 rounded-md text-sm">{user?.name}</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="email">Email</Label>
                  <div className="border p-2 rounded-md text-sm">{user?.email}</div>
                </div>
              </div>
            </section>
            <Separator />
            {/* Educational Information */}
            <section className="flex flex-col gap-5">
              <h2 className="w-fit font-semibold">Educational Credentials</h2>
              { education ? <div className="grid grid-cols-3 gap-x-10 gap-y-5">
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="universityName">Institution Name</Label>
                  <div className="border p-2 rounded-md text-sm">{education.institution}</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="universityCountry">Institution Country</Label>
                  <div className="border p-2 rounded-md text-sm">{education.country}</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="educationLevel">Education Level</Label>
                  <div className="border p-2 rounded-md text-sm">{education.level}</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="major">Major</Label>
                  <div className="border p-2 rounded-md text-sm">{education.major}</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="graduationYear">Education Verified</Label>
                  <div className="border p-2 rounded-md text-sm">{education.isVerified ? <Badge variant="completed">Yes</Badge> : <Badge variant="destructive">No</Badge>}</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="graduationYear">Start Year</Label>
                  <div className="border p-2 rounded-md text-sm">{education.startYear}</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="graduationYear">Graduation Year</Label>
                  <div className="border p-2 rounded-md text-sm">{education.endYear}</div>
                </div>
              </div> : <div className="text-gray-500">No education details found</div>}
            </section>
          </div>
        </section>
        {/* New section: Stripe Account Information
        <section className="flex flex-col gap-4">
          <h2 className="w-fit font-semibold">Stripe Account Information</h2>
          <div className="grid grid-cols-3 gap-x-10 gap-y-5">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-gray-500" htmlFor="stripeId">Stripe ID</label>
              <input
                type="text"
                id="stripeId"
                value={stripeId}
                onChange={handleStripeIdChange}
                className="border p-2 rounded-md text-sm"
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-gray-500" htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                className="border p-2 rounded-md text-sm"
                required
              />
            </div>
          </div>
          <button onClick={saveInfo} className="bg-blue-500 text-white rounded-md p-2 mt-4">Save Info</button>
        </section> */}
      </div>
    </div>
  )
}
