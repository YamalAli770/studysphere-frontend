import { Badge } from '@/components/ui/badge';
import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: string;
  endTime: string;
  meetEnd: () => void;
}

const ConferenceTimer: React.FC<TimerProps> = ({ initialTime, endTime, meetEnd }) => {
  const [timeDifference, setTimeDifference] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const initialTimeObj = new Date(initialTime);
    const endTimeObj = new Date(endTime);

    const calculateTimeDifference = () => {
      const difference = endTimeObj.getTime() - Date.now();
      if (difference < 0) {
        setTimeDifference({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeDifference({ hours, minutes, seconds });
      }
    };

    calculateTimeDifference(); // Initial calculation
    const interval = setInterval(calculateTimeDifference, 1000); // Update every second

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [initialTime, endTime]);

  useEffect(() => {
    const meetEndInterval = setTimeout(meetEnd, (timeDifference.hours * 3600 + timeDifference.minutes * 60 + timeDifference.seconds) * 1000);
    return () => clearTimeout(meetEndInterval); // Clean up interval on unmount
  }, [timeDifference.hours, timeDifference.minutes, timeDifference.seconds, meetEnd]);

  return (
    <Badge variant={'secondary'} className="text-sm px-4 user-select-none">
      {timeDifference.hours.toString().padStart(2, '0')} : {timeDifference.minutes.toString().padStart(2, '0')} : {timeDifference.seconds.toString().padStart(2, '0')}
    </Badge>
  );
};

export default ConferenceTimer;
