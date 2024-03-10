import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialTime: number;
  onTimerEnd: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime, onTimerEnd }) => {
  const [remainingTime, setRemainingTime] = useState<number>(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevRemainingTime) => {
        const newRemainingTime = Math.max(0, prevRemainingTime - 1);

        if (newRemainingTime === 0) {
          clearInterval(intervalId);
          onTimerEnd(); // Trigger the callback when time expires
        }

        return newRemainingTime;
      });
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, [onTimerEnd]);

  // Helper function to pad single-digit values with leading zeros
  const padZero = (value: number) => (value < 10 ? `0${value}` : value);

  // Display the formatted time in your component
  return (
    <div>
      {padZero(Math.floor(remainingTime / 3600))}:{padZero(Math.floor((remainingTime % 3600) / 60))}:
      {padZero(remainingTime % 60)}
    </div>
  );
};

export default CountdownTimer;
