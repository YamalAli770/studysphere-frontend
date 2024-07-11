"use client";

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEdgeStore } from '@/lib/edgestore';
import { updateProfileImage } from '@/actions/profile';
import { toast } from 'sonner';

const ProfileImageSchema = z.object({
  image: z.string().optional(),
});

const ProfileImageUpload = () => {
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(ProfileImageSchema),
  });

  const onSubmit = async (values: any) => {
    setIsPending(true);
    if (values.image) {
      const res = await edgestore.profileImage.upload({
        file: values.image,
      });

      if (res) {
        setUrl(res.url);

        updateProfileImage({ image: res.url })
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
    }
  };

  return (
    <FormProvider {...form}>
      <div className='flex gap-5'>
        <form className='flex flex-col gap-4'>
          <Input type="file" {...form.register('image')} />
        </form>
        <Button className='mt-8' type='submit' onClick={form.handleSubmit(onSubmit)} disabled={isPending}>Submit</Button>
      </div>
    </FormProvider>
  );
};

export default ProfileImageUpload;
