"use client";

import { Button } from '@/components/ui/button';
import { revenueData } from '@/data/revenue-data'
import { FaMoneyBillWaveAlt } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';


export default function RevenueChart() {
  return (
    <div className="col-span-3 p-4 bg-secondary flex flex-col gap-3 rounded-md">
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <FaMoneyBillWaveAlt size={20} />
          <h2 className='pl-3 text-lg'>Revenue</h2>
        </div>
        <Button>Change View</Button>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={revenueData}>
            <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            />
            <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `$${value}`}
            />
            <Bar dataKey="revenue" fill="#21e9c5" radius={[4, 4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
    </div>
  );
}
