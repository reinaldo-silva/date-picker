import clsx from 'clsx';
import React from 'react';

interface DayCalendarItemProps {
  today?: boolean;
  onClick?: () => void;
  day?: number;
  selected?: boolean;
}

export const DayCalendarItem = ({
  day,
  today,
  onClick,
  selected,
}: DayCalendarItemProps) => {
  return (
    <button
      onClick={() => onClick && onClick()}
      className={clsx(
        'flex h-9 w-9 cursor-pointer items-center justify-center',
        {
          '!cursor-default': !day,
        }
      )}
    >
      <span
        className={clsx(
          'relative flex h-full w-full items-center justify-center rounded-full text-center text-lg',
          {
            'hover:bg-indigo-100 hover:text-zinc-800': !!day && !selected,
            'before:absolute before:-bottom-2 before:h-1.5 before:w-5 before:content-normal before:rounded-md before:bg-red-400':
              today,
            'bg-indigo-400 text-zinc-100 hover:!bg-indigo-300': selected,
          }
        )}
      >
        {day}
      </span>
    </button>
  );
};
