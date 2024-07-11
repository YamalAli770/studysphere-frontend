"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

import { useEdgeStore } from "@/lib/edgestore";

import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { EducationVerificationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { createEducationVerificationAction } from "@/actions/education-verification";

export default function VerificationModal() {
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof EducationVerificationSchema>>({
    resolver: zodResolver(EducationVerificationSchema),
  });

  const onSubmit = async (values: z.infer<typeof EducationVerificationSchema>) => {
    setIsPending(true);
    if (values.document) {
      try {
        const res = await edgestore.educationDocument.upload({
          file: values.document,
          onProgressChange(progress) {
            setProgress(progress);
          },
        });
        if (res) {
          setUrl(res.url);
          toast.success("Document uploaded successfully");

          createEducationVerificationAction(values.documentType, res.url)
            .then((data) => {
              if (data?.success) {
                toast.success(data.success);
              } else {
                toast.error(data.error);
              }
            })
            .finally(() => {
              setIsPending(false);
            });
        }
      } catch (error) {
        console.error("Error occurred during document upload:", error);
        toast.error("Error occurred during document upload");
        setIsPending(false);
      }
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-primary text-white p-3 rounded-md text-sm">
          Submit Verification Request
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-medium flex items-center gap-2">
              <h2>Upload Files</h2>
            </DialogTitle>
          </DialogHeader>
          <Separator />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Controller
                name="document"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          e.target.files && field.onChange(e.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Progress value={progress} />
              <Separator className="my-2" />
              {url && (
                <Button variant="link">
                  <Link href={url} target="_blank">
                    View Document
                  </Link>
                </Button>
              )}
              <div className="flex justify-between text-sm text-gray-500">
                <p>Supported Formats: pdf</p>
                <p>Maximum File Size: 4MB</p>
              </div>
              <Separator className="my-2" />
              <Controller
                name="documentType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose uploaded document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem id="degree" value="DEGREE">
                            Degree
                          </SelectItem>
                          <SelectItem id="transcript" value="TRANSCRIPT">
                            Transcript
                          </SelectItem>
                          <SelectItem id="certificate" value="CERTIFICATE">
                            Certificate
                          </SelectItem>
                          <SelectItem id="student_id" value="STUDENT_ID">
                            Student Id
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="my-2" />
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
