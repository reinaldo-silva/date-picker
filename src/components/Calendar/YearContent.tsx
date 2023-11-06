import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface YearContentProps {
  currentDate: Date;
  setCurrentYear: (year: number) => void;
}

export function YearContent({ currentDate, setCurrentYear }: YearContentProps) {
  const [currentDecade, setCurrentDecade] = useState(currentDate.getFullYear());

  const yearArray = Array.from({ length: 10 }).map(
    (_, index) => currentDecade - (9 - index)
  );

  return (
    <div className="flex">
      <button
        className="px-2"
        onClick={() => setCurrentDecade((oldValue) => oldValue - 10)}
      >
        <ChevronLeft />
      </button>
      <div className="grid h-[200px] flex-1 grid-cols-2">
        {yearArray.map((year, index) => (
          <button
            key={index}
            className={clsx('border transition-colors hover:bg-indigo-100', {
              'bg-indigo-400 text-zinc-100 hover:!bg-indigo-300':
                year === currentDate.getFullYear(),
            })}
            onClick={() => setCurrentYear(year)}
          >
            {year}
          </button>
        ))}
      </div>
      <button
        className="px-2"
        onClick={() => setCurrentDecade((oldValue) => oldValue + 10)}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
