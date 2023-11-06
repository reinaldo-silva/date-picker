import { add, sub } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { formatDefaultDate } from '../../utils/dateFns';
import { DayContent } from './DayContent';
import { YearContent } from './YearContent';

const weekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const configActions = [
  {
    currentView: 'daysLeft',
    view: ['month', 'year'],
  },
  {
    currentView: 'daysRight',
    view: ['month', 'year'],
  },
  {
    currentView: 'months',
    view: ['descriptionMonth', 'year'],
  },
  {
    currentView: 'years',
    view: ['descriptionYear'],
  },
];

interface CalendarProps {
  selectedDay?: string;
  setSelectedDay: (value: string) => void;
}

export function Calendar({ selectedDay, setSelectedDay }: CalendarProps) {
  const today = new Date();

  const [currentCalendarDate, setCurrentCalendarDate] = useState(today);

  const [year, month, day] = formatDefaultDate(currentCalendarDate)
    .split('-')
    .map((e) => Number(e));

  // Estado que controla o calendário
  const [currentView, setCurrentView] = useState<
    'daysLeft' | 'daysRight' | 'months' | 'years'
  >('daysLeft');

  const currentConfig = configActions.find(
    (config) => config.currentView === currentView
  );

  const handleChangeDate = useCallback(
    (
      newYear: number,
      newMonth: number,
      newDay: number,
      goTo: 'daysLeft' | 'daysRight' | 'months' | 'years'
    ) => {
      setCurrentCalendarDate(new Date(newYear, newMonth, newDay, 0, 0));
      setCurrentView(goTo);
    },
    []
  );

  return (
    <div className="flex flex-1 flex-col">
      {currentConfig && (
        <header className="flex w-full justify-between gap-4 p-2 font-medium text-zinc-500">
          <div className="flex flex-1 items-center justify-start gap-2">
            {currentConfig.view.includes('month') && (
              <button
                className="select-none hover:text-zinc-800 hover:underline"
                onClick={() => {
                  setCurrentView('months');
                }}
              >
                {months[currentCalendarDate.getMonth()]}
              </button>
            )}
            {currentConfig.view.includes('descriptionMonth') && (
              <span className="select-none">Selecione um mês</span>
            )}
            {currentConfig.view.includes('year') && (
              <button
                className="select-none hover:text-zinc-800 hover:underline"
                onClick={() => {
                  setCurrentView('years');
                }}
              >
                {currentCalendarDate.getFullYear()}
              </button>
            )}
            {currentConfig.view.includes('descriptionYear') && (
              <span className="select-none">Selecione um ano</span>
            )}
          </div>
          {currentConfig.view.includes('month') && (
            <div className="flex items-center justify-center gap-1 text-indigo-500 transition-colors">
              <ChevronLeft
                className="cursor-pointer hover:text-indigo-300"
                onClick={() => {
                  setCurrentCalendarDate((oldValue) =>
                    sub(oldValue, { months: 1 })
                  );
                  setCurrentView('daysRight');
                }}
              />

              <ChevronRight
                className="cursor-pointer hover:text-indigo-300"
                onClick={() => {
                  setCurrentCalendarDate((oldValue) =>
                    add(oldValue, { months: 1 })
                  );
                  setCurrentView('daysLeft');
                }}
              />
            </div>
          )}
        </header>
      )}
      <div className="flex w-full justify-between px-2">
        {weekDays.map((day, index) => (
          <span
            key={index}
            className="flex h-10 w-10 select-none items-center justify-center font-medium text-zinc-400"
          >
            {day[0]}
          </span>
        ))}
      </div>
      {['daysLeft', 'daysRight'].includes(currentView) && (
        <div className="overflow-hidden">
          <AnimatePresence initial={false}>
            <DayContent
              currentView={currentView}
              currentCalendarDate={currentCalendarDate}
              setSelectedDay={setSelectedDay}
              selectedDay={selectedDay}
            />
          </AnimatePresence>
        </div>
      )}
      {currentView === 'months' && (
        <div className="grid h-[200px] grid-cols-2">
          {months.map((month, index) => (
            <button
              key={index}
              className="border transition-colors hover:bg-indigo-100"
              onClick={() => handleChangeDate(year, index, day, 'daysLeft')}
            >
              {month}
            </button>
          ))}
        </div>
      )}
      {currentView === 'years' && (
        <YearContent
          currentDate={currentCalendarDate}
          setCurrentYear={(clickYear: number) =>
            handleChangeDate(clickYear, month - 1, day, 'months')
          }
        />
      )}
    </div>
  );
}
