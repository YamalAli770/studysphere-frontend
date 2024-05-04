import { Badge } from '@/components/ui/badge';
import React, { useState, useEffect } from 'react';

interface TimerProps {
  startTime: string;
  endTime: string;
  meetEnd: () => void;
}

const ConferenceTimer: React.FC<TimerProps> = ({ startTime, endTime, meetEnd }) => {
  const [timeDifference, setTimeDifference] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const startTimeObj = new Date(startTime);
    const endTimeObj = new Date(endTime);
    const currentTime = new Date();

    // Calculate time difference between initial time and end time
    const difference = endTimeObj.getTime() - startTimeObj.getTime();
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const startTimeDifference = { hours, minutes, seconds };

    // Check if the initial time is in the past or equal to the current time
    if (startTimeObj <= currentTime) {
      startTimer(startTimeDifference);
    } else {
      // Show initial time difference before starting the timer
      setTimeDifference(startTimeDifference);

      // Wait until the initial time is reached
      const timeUntilStart = startTimeObj.getTime() - currentTime.getTime();
      setTimeout(() => startTimer(startTimeDifference), timeUntilStart);
    }

    function startTimer(startTimeDifference: { hours: number; minutes: number; seconds: number }) {
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

      // Clean up interval on unmount
      return () => clearInterval(interval);
    }
  }, [startTime, endTime]);

  useEffect(() => {
    const meetEndInterval = setTimeout(meetEnd, (timeDifference.hours * 3600 + timeDifference.minutes * 60 + timeDifference.seconds) * 1000);
    return () => clearTimeout(meetEndInterval); // Clean up interval on unmount
  }, [timeDifference.hours, timeDifference.minutes, timeDifference.seconds, meetEnd]);

  return (
    <Badge variant={'secondary'} className="text-sm px-4 select-none">
      {timeDifference.hours.toString().padStart(2, '0')} : {timeDifference.minutes.toString().padStart(2, '0')} : {timeDifference.seconds.toString().padStart(2, '0')}
    </Badge>
  );
};

export default ConferenceTimer;
