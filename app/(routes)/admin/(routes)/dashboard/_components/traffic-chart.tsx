"use client";

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import { trafficData } from '@/data/traffic-data';
import { ArrowDownUp } from 'lucide-react';

export default function TrafficChart() {
  return (
    <div className='flex flex-col gap-5 rounded-md bg-secondary p-4'>
        <div className='flex items-center justify-between'>
            <div className='flex gap-3 items-center'>
              <ArrowDownUp size={20} />
              <h2 className='text-lg'>Traffic</h2>
            </div>
            <ToggleGroup type='single'>
              <ToggleGroupItem value='day'>Day</ToggleGroupItem>
              <ToggleGroupItem value='month'>Month</ToggleGroupItem>
              <ToggleGroupItem value='year'>Year</ToggleGroupItem>
            </ToggleGroup>
        </div>
        <ResponsiveContainer width="100%" height={350}>
            <LineChart
            data={trafficData} >
            <XAxis tickLine={false} dataKey="name" />
            <YAxis tickLine={false} />
            <Line type="monotone" dataKey="count" stroke="#21e9c5" strokeWidth="3" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}
