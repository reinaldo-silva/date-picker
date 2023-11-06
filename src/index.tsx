import { Calendar } from './components/Calendar';
import { Input } from './components/Input';
import { TimerSelector } from './components/TimerSelector';
import { useHandleDateWithTime } from './hooks/useHandleDateWithTime';
import { useOutsideClick } from './hooks/useOutsideClick';
import { formatDefaultDate } from './utils/dateFns';
import { isAfter } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

export interface DatePickerProps {
  setValue: (value: string) => void;
}

export const DatePicker = ({ setValue }: DatePickerProps) => {
  // Estado do Input de Data
  const [currentSelectDate, setCurrentSelectDate] = useState('');
  // Estado do Input de Horário
  const [currentSelectTime, setCurrentSelectTime] = useState('');

  // Estado do Modal Aberto/Fechado
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setPickerIsOpen(false));

  // Resolver para gerar data com horário
  useHandleDateWithTime(currentSelectDate, currentSelectTime, setValue);

  const handleValidateInput = useCallback(
    (e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
      const { value, min } = e.target;

      if (!value) {
        setCurrentSelectDate(formatDefaultDate(new Date()));
        return;
      }

      if (min) {
        const [year] = value.split('-').map((e) => Number(e));
        if (year > 999 && isAfter(new Date(min), new Date(value))) {
          setCurrentSelectDate(min);
          return;
        }
      }

      setCurrentSelectDate(value);
    },
    []
  );

  const handleManualChangeDate = (action: 'clear' | 'today') => {
    if (action === 'clear') {
      setCurrentSelectDate('');
      setCurrentSelectTime('');
      setValue('');
    }

    if (action === 'today') {
      setCurrentSelectDate(formatDefaultDate(new Date()));
      setCurrentSelectTime('00:00');
    }
  };

  return (
    <label className="relative flex gap-2" ref={wrapperRef}>
      <Input.Content>
        <Input.Input
          type="date"
          onClick={(e) => e.preventDefault()}
          onFocus={(e) => {
            e.preventDefault();
            setPickerIsOpen(true);
          }}
          value={currentSelectDate}
          onChange={handleValidateInput}
          onBlur={handleValidateInput}
          max="9999-12-31"
          min="1850-01-01"
        />
        <Input.Input
          type="time"
          onClick={(e) => e.preventDefault()}
          onFocus={(e) => {
            e.preventDefault();
            setPickerIsOpen(true);
          }}
          value={currentSelectTime}
          onChange={(e) => {
            setCurrentSelectTime(e.target.value);
          }}
        />
      </Input.Content>

      <AnimatePresence>
        {pickerIsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute left-0 top-10 flex min-h-[360px] min-w-[450px] rounded-md border border-zinc-200 bg-white p-2 drop-shadow-sm"
          >
            <div className="flex flex-col">
              <Calendar
                setSelectedDay={setCurrentSelectDate}
                selectedDay={currentSelectDate}
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
              currentTime={currentSelectTime}
              setCurrentTime={setCurrentSelectTime}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </label>
  );
};
