"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/auth/login";
import Social from "../_components/social";

export default function SignIn() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
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
              <h2 className="text-2xl">Welcome back</h2>
              <p className="text-xs">Please enter your details to sign in.</p>
            </section>
            {/* Middle */}
            <Form {...form}>
              <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col gap-5">
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
                  <Button type="submit" disabled={isPending}>Sign In</Button>
                  <FormSuccess message={success} />
                  <FormError message={error} />
                </div>
              </form>
            </Form>
            {/* Bottom */}
            <Social />
            <section className="flex flex-col gap-5 w-full">
              <p className="text-xs text-center text-gray-400">Don't have an account yet? <Link href="/auth/sign-up" className="text-black hover:text-gray-600">Sign Up</Link></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}