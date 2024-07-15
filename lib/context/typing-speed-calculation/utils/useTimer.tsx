import { useEffect, useState } from "react";

export const useTimer = (secondsLeft: number) => {
  const duration = 60;
  const [startTime, setStartTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(secondsLeft);

  useEffect(() => {
    if (!timeLeft) return;

    const interval = setInterval(() => {
      const secondsSinceStart = Math.round(
        (new Date().getTime() - startTime.getTime()) / 1000,
      );
      setTimeLeft(duration - secondsSinceStart);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, startTime]);

  const resetTimer = () => {
    setStartTime(new Date());
    setTimeLeft(duration);
  };

  return { timeLeft, resetTimer };
};
