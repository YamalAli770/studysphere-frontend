"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogTrigger, DialogContent, DialogHeader, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { createEducationAction } from "@/actions/education"; 
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EducationSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import countries from "i18n-iso-countries";
// Import the languages to use
import enLocale from "i18n-iso-countries/langs/en.json";
import { useMemo, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Register the languages
countries.registerLocale(enLocale);

export default function EducationModal() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof EducationSchema>>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
        institution: "",
        country: "",
        major: "",
    }
  });

  // Country Dropdown
  const countryObj = countries.getNames("en", { select: "official" });
  const countryArray = useMemo(() => {
    return Object.entries(countryObj).map(([key, value]) => ({
      label: value,
      value: key
    }))
  }, [countryObj]);

  const onSubmit = (values: z.infer<typeof EducationSchema>) => {
    form.reset();
    startTransition(() => {
        createEducationAction(values)
          .then((data) => {
              if(data?.success) {
                  router.refresh();
                  toast.success(data.success);
              }
              else {
                toast.error(data.error);
              }
          })
    });
  };

  return (
    <div>
        <Dialog>
            <DialogTrigger className='bg-primary text-white p-3 rounded-md text-sm'>
            Add Education Information
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle className='font-medium flex items-center gap-2'>
                <h2>Educational Information</h2>
                </DialogTitle>
            </DialogHeader>
            <DialogDescription>
                <p className='text-gray-500'>Please provide your latest educational information.</p>
            </DialogDescription>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        <FormField control={form.control} name="institution" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Institution</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Stanford University" type="text" disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="country" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose Country Of Educational Institution" />
                                </SelectTrigger>
                                <SelectContent>
                                    { countryArray.map((country) => (
                                        <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="level" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Level</FormLabel>
                            <FormControl>
                              <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose your education level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem id="high_school" value="HIGH_SCHOOL">High School</SelectItem>
                                  <SelectItem id="bachelor" value="BACHELOR">Bachelor</SelectItem>
                                  <SelectItem id="master" value="MASTER">Master</SelectItem>
                                  <SelectItem id="phd" value="PHD">PhD</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="major" render={({ field }) => (
                            <FormItem>
                            <FormLabel>Major</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="B.E Software Engineering" type="text" disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                        <div className="flex gap-4">
                            <FormField control={form.control} name="startYear" render={({ field }) => (
                                <FormItem>
                                <FormLabel>Start Year</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="1998" type="number" disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="endYear" render={({ field }) => (
                                <FormItem>
                                <FormLabel>End Year</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="2002" type="number" disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <Button type="submit" className="mt-2">Save</Button>
                    </div>
                </form>
            </Form>
            </DialogContent>
        </Dialog>
    </div>
  )
}
