import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaApple, FaXTwitter, FaGoogle } from 'react-icons/fa6'

const socialLogins = [
  {
    name: "Apple",
    icon: <FaApple size="20" />,
  },
  {
    name: "Google",
    icon: <FaGoogle size="16" />,
  },
  {
    name: "Twitter",
    icon: <FaXTwitter size="16" />,
  },
]

export default function SignUp() {
  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <div className="container">
        <div className="bg-primary-bg rounded-lg w-user mx-auto p-10">
          <div className="flex flex-col mx-auto items-center gap-5">
            {/* Top */}
            <section className="w-full flex flex-col items-center gap-3">
              <Image src="logo.svg" alt="logo" width={30} height={30} />
              <h2 className="text-2xl">Register Now!</h2>
              <p className="text-xs">Please enter your details to sign up.</p>
              <div className="flex justify-between w-full">
                {socialLogins.map((social, index) => (
                  <Button key={index} variant="social">{social.icon}</Button>
                ))}
              </div>
            </section>
            {/* Seperator */}
            <div className="flex items-center gap-2 w-full">
              <span className="border-gray-400 border w-full h-[1px]" />
              <span className="text-xs">
                OR
              </span>
              <span className="border-gray-400 border w-full h-[1px]" />
            </div>
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
              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="account-type">Account Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mentee">Mentee</SelectItem>
                    <SelectItem value="mentor">Mentor</SelectItem>
                  </SelectContent>
                </Select>
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
              <Button>Sign Up</Button>
              <p className="text-xs text-center text-gray-400">Already have an account? <Link href="/sign-in" className="text-black hover:text-gray-600">Sign In</Link></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}