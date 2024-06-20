import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MentorCardProps {
  mentor: Mentor;
}

const defaultAvatar = "https://images.unsplash.com/photo-1531750026848-8ada78f641c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGhlYWRzaG90c3xlbnwwfHwwfHx8MA%3D%3D";

const MentorCard = ({ mentor }: MentorCardProps) => {
  return (
    <div>
      <div className="flex flex-col gap-5 bg-white shadow-md rounded-md p-4">
        <div className='flex justify-between items-center'>
          <div className='flex gap-3'>
            <div className='w-12 h-12 relative'>
              <Image src={mentor.image || defaultAvatar} alt={mentor.name || ""} fill className="rounded-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{mentor.name}</h2>
              <p className="text-sm text-gray-500">{mentor.education?.country || "N/A"}</p>
            </div>
          </div>
          <Link href={`/dashboard/user/${mentor.id}`}>
            <Eye />
          </Link>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center gap-2 border-b'>
            <Label className='font-bold text-sm'>Degree:</Label>
            <span className='text-sm'>{mentor.education?.major}</span>
          </div>
          <div className='flex items-center gap-2 border-b'>
            <Label className='font-bold'>Institution:</Label>
            <span className='text-sm'>{mentor.education?.institution}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
