import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { getUserViewById } from "@/lib/data/user";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { currentUserServer } from "@/lib/user-server";
import { redirect } from "next/navigation";

type UserViewPageProps = {
  params: {
    id: string;
  };
}

export default async function UserViewPage({ params: { id } }: UserViewPageProps) {
  const currentUser = await currentUserServer();
  const user = await getUserViewById(id);

  if(!user) {
    return null;
  }

  if(currentUser?.id === user.id) {
    redirect('/dashboard/profile');
  }

  return (
    <div>
      <div className="p-6">
      <div className="flex flex-col gap-7">
        {/* Top */}
        <section className="flex justify-between items-center">
          <div className="flex flex-col gap-7">
            <h1 className="text-3xl font-semibold">User Profile</h1>
            <div className="flex items-center gap-3">
              { user.image ? 
                <Image src={user?.image} alt="name" width={100} height={100} className="rounded-full" />
                : <UserCircle width={100} height={100} />
              }
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">{user.name} ({user.role})</h2>
                <h2 className="text-sm text-gray-500">{user.education?.institution}</h2>
              </div>
            </div>
          </div>
        </section>
        {/* Middle */}
        <section className="flex flex-col gap-4">
          {/* Profile Details */}
          <div className="flex flex-col gap-7">            
            <Separator />
            {/* Educational Information */}
            <section className="flex flex-col gap-5">
              <h2 className="w-fit font-semibold">Educational Credentials</h2>
              { user.education ? <div className="grid grid-cols-3 gap-x-10 gap-y-5">
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="universityName">Institution Name</Label>
                  <div className="border p-2 rounded-md text-sm">{user.education.institution}</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="universityCountry">Institution Country</Label>
                  <div className="border p-2 rounded-md text-sm">{user.education.country}</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="educationLevel">Education Level</Label>
                  <div className="border p-2 rounded-md text-sm">{user.education.level}</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="major">Major</Label>
                  <div className="border p-2 rounded-md text-sm">{user.education.major}</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="graduationYear">Education Verified</Label>
                  <div className="border p-2 rounded-md text-sm">{user.education.isVerified ? <Badge variant="completed">Yes</Badge> : <Badge variant="destructive">No</Badge>}</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="graduationYear">Start Year</Label>
                  <div className="border p-2 rounded-md text-sm">{user.education.startYear}</div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-gray-500" htmlFor="graduationYear">Graduation Year</Label>
                  <div className="border p-2 rounded-md text-sm">{user.education.endYear}</div>
                </div>
              </div> : <div className="text-gray-500">No education details found</div> }
            </section>
            {/* User Bio */}
            { user.bio && <section className="flex flex-col gap-5">
              <h2 className="w-fit font-semibold">User Bio</h2>
              <Textarea className="border p-2 rounded-md text-sm" readOnly>{user.bio}</Textarea>
            </section>}
          </div>
        </section>
        { user.education?.isVerified && <Button className="w-fit place-self-end">Send Meetup Request</Button>}
      </div>
    </div>
    </div>
  )
}
