import clsx from 'clsx';
import { isAfter, isValid } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react';

import { Calendar } from './components/Calendar';
import { Input } from './components/Input';
import { TimerSelector } from './components/TimerSelector';
import { useOutsideClick } from './hooks/useOutsideClick';
import { formatDate } from './utils/dateFns';

interface IHandleSetDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minutes: number;
}

const acceptsTypes = ['datetime-local', 'time', 'date'];

export const DatePicker = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  (
    {
      className,
      onClick,
      onChange,
      onBlur,
      onFocus,
      value: nativeValue,
      max = '9999-12-31',
      min = '1950-01-01',
      type = 'datetime',
      ...rest
    },
    ref
  ) => {
    const verifyType = (): 'datetime-local' | 'time' | 'date' =>
      (!acceptsTypes.includes(type) ? acceptsTypes[0] : type) as any;

    // Estado do Modal Aberto/Fechado
    const [pickerIsOpen, setPickerIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, () => setPickerIsOpen(false));

    const [value, setValue] = useState('');

    const handleValidateInput = useCallback(
      (e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
        const { value, min } = e.target;

        if (!value) {
          setValue(formatDate({ date: new Date(), type: verifyType() }));
          return;
        }

        if (min) {
          if (!isValid(new Date(min))) {
            setValue(formatDate({ date: new Date(), type: verifyType() }));

            return;
          }

          const [year] = value.split('-').map((e) => Number(e));
          if (year > 999 && isAfter(new Date(min), new Date(value))) {
            const [year, month, day] = min.split('-').map((e) => Number(e));

            setValue(
              formatDate({
                date: new Date(year, month - 1, day, 0, 0),
                type: verifyType(),
              })
            );
            return;
          }
        }

        setValue(value);
      },
      []
    );

    const handleManualChangeDate = (action: 'clear' | 'today') => {
      if (action === 'clear') {
        setValue('');
      }

      if (action === 'today') {
        setValue(formatDate({ date: new Date(), type: verifyType() }));
      }
    };

    const handleSetValueDate = ({
      year,
      month,
      day,
      hour,
      minutes,
    }: IHandleSetDate) => {
      setValue(
        formatDate({
          date: new Date(year, month, day, hour, minutes),
          type: verifyType(),
        })
      );
    };

    return (
      <Input.Content ref={wrapperRef} className='w-full'>
        <input
          ref={ref}
          type={verifyType()}
          className={clsx('cursor-pointer px-1 outline-none flex-1', className)}
          onClick={(e) => {
            e.preventDefault();
            onClick && onClick(e);
          }}
          onFocus={(e) => {
            e.preventDefault();
            setPickerIsOpen(true);
            onFocus && onFocus(e);
          }}
          onChange={(e) => {
            handleValidateInput(e);
            onChange && onChange(e);
          }}
          onBlur={(e) => {
            handleValidateInput(e);
            onBlur && onBlur(e);
          }}
          max={max}
          min={min}
          value={nativeValue ?? value}
          {...rest}
        />

        <AnimatePresence>
          {pickerIsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute z-40 left-0 top-10 flex min-h-[360px] min-w-[450px] rounded-md border border-zinc-200 bg-white p-2 drop-shadow-sm"
            >
              <div className="flex flex-col">
                <Calendar
                  setSelectedDay={(year, month, day) => {
                    const [hour, minutes] = formatDate({
                      date: new Date(value),
                      type: 'time',
                    })
                      .split(':')
                      .map((e) => Number(e));

                    handleSetValueDate({
                      year,
                      month,
                      day,
                      hour: hour ?? 0,
                      minutes: minutes ?? 0,
                    });
                  }}
                  selectedDay={formatDate({
                    date: new Date(value),
                    type: 'date',
                  })}
                />
                <div className="flex justify-between px-4 py-2 text-sm font-medium text-indigo-400">
                  <button
                    className="hover:underline"
                    onClick={() => handleManualChangeDate('today')}
                  >
                    Hoje
                  </button>
                  <button
                    className="hover:underline"
                    onClick={() => handleManualChangeDate('clear')}
                  >
                    Limpar
                  </button>
                </div>
              </div>

              <TimerSelector
                currentTime={formatDate({
                  date: new Date(value),
                  type: 'time',
                })}
                setCurrentTime={(hour, minutes) => {
                  const [year, month, day] = formatDate({
                    date: new Date(value),
                    type: 'date',
                  })
                    .split('-')
                    .map((e) => Number(e));

                  handleSetValueDate({
                    year,
                    month: month - 1,
                    day,
                    hour,
                    minutes,
                  });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Input.Content>
    );
  }
);
