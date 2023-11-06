import React, { useCallback } from 'react';
import { ScrollContent } from './ScrollTimeContent';
import { ScrollItem } from './ScrollTimeItem';

interface TimerSelectorProps {
  currentTime?: string;
  setCurrentTime: (hour: number, minutes: number) => void;
}

export function TimerSelector({
  currentTime,
  setCurrentTime,
}: TimerSelectorProps) {
  const [hour, minutes] = currentTime
    ? currentTime.split(':').map((e) => Number(e))
    : [0, 0];

  const handleSetCurrentTime = useCallback(
    (newHour: number, newMinute: number) => {
      setCurrentTime(newHour, newMinute);
    },
    [setCurrentTime]
  );

  return (
    <div className="my-auto flex max-h-[284px] flex-1 px-2">
      <main className="grid flex-1 grid-cols-2">
        <ScrollContent isSelected={`hour-${hour}`}>
          {Array.from({ length: 24 }).map((_, index) => (
            <ScrollItem
              onClick={() => handleSetCurrentTime(index, minutes)}
              key={`hour-${index}`}
              id={`hour-${index}`}
              isSelected={index === hour}
            >
              {index}
            </ScrollItem>
          ))}
        </ScrollContent>

        <ScrollContent isSelected={`min-${minutes}`}>
          {Array.from({ length: 60 }).map((_, index) => (
            <ScrollItem
              onClick={() => handleSetCurrentTime(hour, index)}
              key={`min-${index}`}
              id={`min-${index}`}
              isSelected={index === minutes}
            >
              {index}
            </ScrollItem>
          ))}
        </ScrollContent>
      </main>
    </div>
  );
}
