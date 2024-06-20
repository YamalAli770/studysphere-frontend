'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED';

interface OrderFilterProps {
  orders: {
    id: string;
    meetupRequestId: string;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
    roomId: string;
  }[] | null;
}

const OrderFilter = ({ orders }: OrderFilterProps) => {
  if (!orders) {
    return null;
  };

  const [status, setStatus] = useState('ALL');

  const filteredOrders = status === 'ALL' ? orders : orders.filter(order => order.status === status);

  return (
    <div className='flex flex-col p-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>Orders</h1>
        <Select defaultValue='ALL' onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
              <SelectItem value="DISPUTED">Disputed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='flex flex-wrap gap-5 mt-6'>
        {
            filteredOrders.length > 0 ? 
            filteredOrders.map(order => (
                <Link href={`/dashboard/order/${order.id}`} key={order.id} className='flex justify-between gap-10 items-center p-4 border border-gray-200 rounded-lg mb-4 w-96 hover:bg-slate-700/20'>
                    <div className='flex flex-col'>
                    <h3><span className='font-semibold'>Order ID:</span> {order.id}</h3>
                    </div>
                    <div>
                    <Badge>{order.status}</Badge>
                    </div>
                </Link>
        )) :
            <div className='flex items-center justify-center w-full h-64'>
                <p className='text-lg text-gray-500'>No Orders Found</p>
            </div>  
        }
      </div>
    </div>
  );
};

export default OrderFilter;
