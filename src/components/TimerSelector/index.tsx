import React, { useCallback } from 'react';
import { formatDefaultTime } from '../../utils/dateFns';
import { ScrollContent } from './ScrollTimeContent';
import { ScrollItem } from './ScrollTimeItem';

interface TimerSelectorProps {
  currentTime?: string;
  setCurrentTime: (value: string) => void;
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
      const newTime = formatDefaultTime(
        new Date(2023, 1, 1, newHour, newMinute)
      );

      setCurrentTime(newTime);
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
