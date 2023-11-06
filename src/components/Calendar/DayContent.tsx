import { lastDayOfMonth, startOfMonth } from 'date-fns';
import { motion } from 'framer-motion';
import React from 'react';
import {
  StringToDate,
  compareDateWithoutTime,
  formatDefaultDate,
} from '../../utils/dateFns';
import { DayCalendarItem } from './DayItem';

interface DayContentProps {
  setSelectedDay: (value: string) => void;
  selectedDay?: string;
  currentCalendarDate: Date;
  currentView: string;
}

const variantsRight = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1 },
};
const variantsLeft = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export function DayContent({
  setSelectedDay,
  selectedDay,
  currentCalendarDate,
  currentView,
}: DayContentProps) {
  const today = new Date();

  const currentVariant =
    currentView === 'daysLeft' ? variantsLeft : variantsRight;

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={currentVariant}
      transition={{ ease: 'easeInOut', duration: 0.15 }}
      id={String(currentCalendarDate.getMonth() + 1)}
      key={String(currentCalendarDate.getMonth() + 1)}
      className="grid flex-1 grid-cols-7 gap-1 px-2"
    >
      {Array.from({
        length: startOfMonth(currentCalendarDate).getDay(),
      }).map((_, index) => (
        <DayCalendarItem key={index + 1} />
      ))}
      {Array.from({
        length: lastDayOfMonth(currentCalendarDate).getDate(),
      }).map((_, index) => {
        const currentDate = new Date(
          currentCalendarDate.getFullYear(),
          currentCalendarDate.getMonth(),
          index + 1
        );

        return (
          <DayCalendarItem
            today={compareDateWithoutTime(today, currentDate)}
            selected={
              selectedDay
                ? compareDateWithoutTime(StringToDate(selectedDay), currentDate)
                : false
            }
            onClick={() => setSelectedDay(formatDefaultDate(currentDate))}
            key={index + 1}
            day={index + 1}
          />
        );
      })}
    </motion.main>
  );
}
