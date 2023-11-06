'use client';
import { useEffect } from 'react';

export function useHandleDateWithTime(
  date: string,
  time: string,
  setValue: (value: string) => void
) {
  useEffect(() => {
    const [year, month, day] = date.split('-');
    const [hour, minutes] = time.split(':');

    if (date && time) {
      const newDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minutes)
      );

      setValue(newDate.toString());
    }
  }, [date, time, setValue]);
}
