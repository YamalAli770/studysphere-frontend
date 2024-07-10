// components/Order.tsx

"use client";

import { Badge } from '@/components/ui/badge';
import { OrderType } from '@/types/order';
import { AtSign, User } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PiHandbag } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { ReviewModal } from './review-modal';
import { currentUser } from '@/lib/auth';
import { ExtendedUser } from '@/next-auth';

interface OrderProps {
  order: OrderType;
  user?: ExtendedUser;
}

const Order: React.FC<OrderProps> = ({ order, user }) => {
  const searchParams = useSearchParams();
  const mt = searchParams.get('mt');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='p-6 h-full flex flex-col gap-5'>
      {mt && (
        <div className='p-4 bg-green-100 border-l-4 border-green-500 text-green-700'>
          Meeting ended successfully
        </div>
      )}
      <div>
        <div className='flex items-center gap-2'>
          <h1 className='font-semibold text-2xl sm:text-3xl'>Order ID: {order.id}</h1>
          <Badge className='' variant={order.status === "COMPLETED" ? "completed" : order.status === "CANCELLED" ? "cancelled" : order.status === "PENDING" ? "pending" : "default"}>{order.status}</Badge>
        </div>
        <span className='text-sm'>{new Date(order.createdAt).toLocaleString()}</span>
      </div>
      <div className='grid grid-cols-1 xl:grid-cols-7 gap-2'>
        <div className='flex flex-col gap-2 md:col-span-5 border-2 rounded-lg p-6'>
          <h2 className='font-bold text-xl'>Order Summary</h2>
          <div className='flex flex-col gap-4'>
            <span className='flex gap-1 border-b-2 text-gray-600 pb-2'>
              <span className="font-semibold">Meetup Time:</span>
              {new Date(order.meetupRequest.dateTime).toLocaleString()}
            </span>
            <span className='flex gap-1 border-b-2 text-gray-600 pb-2'>
              <span className="font-semibold">Duration:</span>
              {order.meetupRequest.durationInMinutes} minutes
            </span>
            <span className='flex gap-1 border-b-2 text-gray-600 pb-2'>
              <span className="font-semibold">Room ID:</span>
              {order.roomId}
            </span>
          </div>
        </div>
        <div className='flex flex-col gap-4 md:col-span-2 border-2 rounded-lg p-6'>
          <h2 className='font-bold text-xl'>Customers</h2>
          <Link href={`/dashboard/user/${order.meetupRequest.mentorId}`} className='flex flex-col gap-2 border-2 border-gray-200 p-4 rounded-xl hover:bg-slate-800/10'>
            <div className='flex flex-col gap-0.5'>
              <h3 className='flex items-center gap-1 text-sm text-gray-600'><User size={15} /> {order.meetupRequest.mentor.name}</h3>
              <span className='flex items-center gap-1 text-sm text-gray-600'><PiHandbag size={15} /> {order.meetupRequest.mentor.role}</span>
              <span className='flex items-center gap-1 text-sm text-gray-600'><AtSign size={15} /> {order.meetupRequest.mentor.email}</span>
            </div>
          </Link>
          <Link href={`/dashboard/user/${order.meetupRequest.menteeId}`} className='flex flex-col gap-2 border-2 border-gray-200 p-4 rounded-xl hover:bg-slate-800/10'>
            <div className='flex flex-col gap-0.5'>
              <h3 className='flex items-center gap-1 text-sm text-gray-600'><User size={15} /> {order.meetupRequest.mentee.name}</h3>
              <span className='flex items-center gap-1 text-sm text-gray-600'><PiHandbag size={15} /> {order.meetupRequest.mentee.role}</span>
              <span className='flex items-center gap-1 text-sm text-gray-600'><AtSign size={15} /> {order.meetupRequest.mentee.email}</span>
            </div>
          </Link>
        </div>
      </div>
      { mt == "true" && user?.role === "MENTEE" &&  <Button className='w-40' onClick={() => setIsModalOpen(true)} >Submit Feedback</Button>}
      <ReviewModal orderId={order.id} isModalOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default Order;
