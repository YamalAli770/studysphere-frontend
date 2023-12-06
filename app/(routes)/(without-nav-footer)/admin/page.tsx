import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export default function AdminLogin() {
  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <div className="container">
        <div className="bg-primary-bg rounded-lg w-user mx-auto p-10">
          <div className="flex flex-col mx-auto items-center gap-5">
            {/* Top */}
            <section className="w-full flex flex-col items-center gap-3">
              <Image src="logo.svg" alt="logo" width={30} height={30} />
              <h2 className="text-2xl">Admin Dashboard</h2>
              <p className="text-xs">Please enter your details to sign in.</p>
            </section>
            <Separator />
            {/* Middle */}
            <form className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" placeholder="Enter your email..." className="border py-2 px-2 rounded-md" />
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="**************" className="border py-2 px-2 rounded-md" />
              </div>
            </form>
            {/* Bottom */}
            <section className="flex flex-col gap-5 w-full">
              <div className="flex justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="underline hover:text-gray-400 transition">
                  Forgot Password?
                </Link>
              </div>
              <Link href="/admin/dashboard" className="flex w-full"><Button className="w-full">Sign In</Button></Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
