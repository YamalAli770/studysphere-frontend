"use client";

import { useState } from 'react';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useForm } from 'react-hook-form';
import * as z from "zod";
import { PostSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

import { useEdgeStore } from '@/lib/edgestore';
import { createPostAction } from '@/actions/post';

export default function CreatePost() {
    const { edgestore } = useEdgeStore();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            content: '',
            image: null
        }
    });

    const onSubmit = async (values: z.infer<typeof PostSchema>) => {
        setIsPending(true);

        if(values.image !== null) {
            const res = await edgestore.postImage.upload({
                file: values.image
            });

            if(res) {
                createPostAction(values.content, res.url)
                    .then((data) => {
                        if(data?.success) {
                            toast.success(data.success);
                        }
                        else {
                            toast.error(data.error);
                            form.reset();
                        }
                    })
                    .finally(() => {
                        form.reset();
                        setImageUrl(null);
                        setIsPending(false);
                    });
            };
        }
        else {
            createPostAction(values.content, null)
                .then((data) => {
                    if(data?.success) {
                        toast.success(data.success);
                    }
                    else {
                        toast.error(data.error);
                        form.reset();
                    }
                })
                .finally(() => {
                    form.reset();
                    setIsPending(false);
                });
        }
    };

    return (
        <div className='border bg-white shadow-md p-6 mb-8 rounded-lg'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex space-x-4 pb-6'>
                        <FormField control={form.control} name='content' render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <Textarea {...field} placeholder="What's on your mind?" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    { imageUrl && <div className='relative w-full h-72'>
                        <Image src={imageUrl} objectFit='cover' className='rounded-lg' fill={true} alt='post-image' />
                    </div>}
                    <div className='flex justify-between items-center pt-5'>
                        <FormField control={form.control} name='image' render={({ field: { value, onChange, ...field } }) => (
                            <FormItem className='flex items-center gap-2'>
                                <FormLabel className='cursor-pointer'>
                                    <ImageIcon color='gray' />
                                </FormLabel>
                                <FormControl>
                                    <Input type="file" {...field} style={{ display: 'none' }} value={value?.file} onChange={(e) => {
                                        e.target.files && (
                                            setImageUrl(URL.createObjectURL(e.target.files[0])),
                                            onChange(e.target.files[0])
                                        );
                                    }} />
                                </FormControl>
                                <FormMessage style={{ marginTop: 0 }} />
                            </FormItem>
                        )}>
                        </FormField>
                        <div className='flex justify-center space-x-4'>
                            <Button type='submit' disabled={isPending} variant='rounded' size='lg'>
                                Post
                            </Button>
                        </div>  
                    </div>
                </form>
            </Form>
        </div>
    )
}