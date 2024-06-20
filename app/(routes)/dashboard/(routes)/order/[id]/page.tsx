import { Badge } from '@/components/ui/badge';
import { getOrderById } from '@/lib/data/order';
import { AtSign, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PiHandbag } from 'react-icons/pi';

interface OrderProps {
    params: {
        id: string;
    };
}

const Order = async ({ params: { id } }: OrderProps) => {
    const order = await getOrderById(id);
    let image = "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGhlYWRzaG90c3xlbnwwfHwwfHx8MA%3D%3D";

    return (
        <div className='p-6 h-full flex flex-col gap-5'>
            <div>
                <div className='flex items-center gap-2'>
                    <h1 className='font-semibold text-2xl sm:text-3xl'>Order ID: {order?.id}</h1>
                    <Badge className='' variant={order?.status === "COMPLETED" ? "completed" : order?.status === "CANCELLED" ? "cancelled" : order?.status === "PENDING" ? "pending" : "default"}>{order?.status}</Badge>
                </div>
                <span className='text-sm'>{order?.createdAt.toLocaleString()}</span>
            </div>
            <div className='grid grid-cols-1 xl:grid-cols-7 gap-2'>
                <div className='flex flex-col gap-2 md:col-span-5 border-2 rounded-lg p-6'>
                    <h2 className='font-bold text-xl'>Order Summary</h2>
                    <div className='flex flex-col gap-4'>
                        <span className='flex gap-1 border-b-2 text-gray-600 pb-2'>
                            <span className="font-semibold">Meetup Time:</span>
                            {new Date(order?.meetupRequest.dateTime as string).toLocaleString()}
                        </span>
                        <span className='flex gap-1 border-b-2 text-gray-600 pb-2'>
                            <span className="font-semibold">Duration:</span>
                            {order?.meetupRequest.durationInMinutes} minutes
                        </span>
                        <span className='flex gap-1 border-b-2 text-gray-600 pb-2'>
                            <span className="font-semibold">Room ID:</span>
                            {order?.roomId}
                        </span>
                    </div>
                </div>
                <div className='flex flex-col gap-4 md:col-span-2 border-2 rounded-lg p-6'>
                    <h2 className='font-bold text-xl'>Customers</h2>
                    <Link href={`/dashboard/user/${order?.meetupRequest.mentorId}`} className='flex flex-col gap-2 border-2 border-gray-200 p-4 rounded-xl hover:bg-slate-800/10'>
                        <div className='flex flex-col gap-0.5'>
                            <h3 className='flex items-center gap-1 text-sm text-gray-600'><User size={15} /> {order?.meetupRequest.mentor.name}</h3>
                            <span className='flex items-center gap-1 text-sm text-gray-600'><PiHandbag size={15} /> {order?.meetupRequest.mentor.role}</span>
                            <span className='flex items-center gap-1 text-sm text-gray-600'><AtSign size={15} /> {order?.meetupRequest.mentor.email}</span>
                        </div>
                    </Link>
                    <Link href={`/dashboard/user/${order?.meetupRequest.menteeId}`} className='flex flex-col gap-2 border-2 border-gray-200 p-4 rounded-xl hover:bg-slate-800/10'>
                        <div className='flex flex-col gap-0.5'>
                            <h3 className='flex items-center gap-1 text-sm text-gray-600'><User size={15} /> {order?.meetupRequest.mentee.name}</h3>
                            <span className='flex items-center gap-1 text-sm text-gray-600'><PiHandbag size={15} /> {order?.meetupRequest.mentee.role}</span>
                            <span className='flex items-center gap-1 text-sm text-gray-600'><AtSign size={15} /> {order?.meetupRequest.mentee.email}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Order;
