import { useState, useEffect } from 'react';

/**
 * Custom countdown timer hook
 * @param {number} initialSeconds
 * @returns {{ seconds: number, isFinished: boolean, resetCountdown: () => void }}
 */
export const useCountdown = (initialSeconds = 60) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (seconds <= 0) {
      setIsFinished(true);
      return;
    }

    setIsFinished(false);
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const resetCountdown = (newSeconds = initialSeconds) => {
    setSeconds(newSeconds);
    setIsFinished(false);
  };

  return { seconds, isFinished, resetCountdown };
};

export default useCountdown;
