"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

import { register } from "@/actions/auth/register";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Social from "../_components/social";

export default function SignUp() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
    })
  };
  
  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <div className="container">
            <div className="bg-primary-bg rounded-lg w-user mx-auto p-10">
              <div className="flex flex-col mx-auto items-center gap-5">
                {/* Top */}
                <section className="w-full flex flex-col items-center gap-3">
                  <Image src="/logo.svg" alt="logo" width={30} height={30} />
                  <h2 className="text-2xl">Study Sphere</h2>
                  <p className="text-xs">Please enter your details to sign up.</p>
                </section>
                {/* Middle */}
                <Form {...form}>
                  <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col gap-3">
                      <div className="flex flex-col gap-2 text-sm">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="johndoe" type="text" disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="john.doe@example.com" type="email" disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
                        <FormField control={form.control} name="password" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="******" type="password" disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
                        <FormField control={form.control} name="role" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Type</FormLabel>
                            <FormControl>
                              <Select {...field} value={field.value} onValueChange={field.onChange} disabled={isPending}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose your account type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem id="mentee" value="MENTEE">Mentee</SelectItem>
                                  <SelectItem id="mentor" value="MENTOR">Mentor</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <Button className="mt-2" type="submit" disabled={isPending}>Sign Up</Button>
                      <FormSuccess message={success} />
                      <FormError message={error} />
                    </div>
                  </form>
                </Form>
                {/* Bottom */}
                <section className="flex flex-col gap-5 w-full">
                  <Social />
                  <p className="text-xs text-center text-gray-400">Already have an account? <Link href="/auth/sign-in" className="text-black hover:text-gray-600">Sign In</Link></p>
                </section>
              </div>
            </div>
      </div>
    </div>
  )
}