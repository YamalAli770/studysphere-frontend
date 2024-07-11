"use client";

import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEdgeStore } from '@/lib/edgestore';
import { updateProfileImage } from '@/actions/profile';
import { toast } from 'sonner';

const ProfileImageSchema = z.object({
  image: z.instanceof(File).optional(),
});

const FileInput = () => {
  const { register, setValue } = useFormContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
    }
  };

  return <Input type="file" onChange={handleFileChange} />;
};

const ProfileImageUpload = () => {
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(ProfileImageSchema),
  });

  const onSubmit = async (values: any) => {
    setIsPending(true);
    try {
      if (values.image) {
        const res = await edgestore.profileImage.upload({
          file: values.image,
        });

        if (res) {
          setUrl(res.url);

          const data = await updateProfileImage({ image: res.url });
          if (data?.success) {
            toast.success(data.success);
          } else {
            toast.error(data.error);
          }
        }
      }
    } catch (error) {
      console.error("Error occurred during profile image upload:", error);
      toast.error('An error occurred while uploading the image.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FileInput />
        <Button className='mt-8' type='submit' disabled={isPending}>Submit</Button>
      </form>
    </FormProvider>
  );
};

export default ProfileImageUpload;
