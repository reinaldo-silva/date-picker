import { format, isValid, toDate } from 'date-fns';

interface IFormatDate {
  date?: Date;
  type: 'datetime-local' | 'time' | 'date';
}

function formatDate({ type, date }: IFormatDate) {
  if (!date) {
    return '';
  }

  if (!isValid(date)) {
    return '';
  }

  if (type === 'datetime-local') {
    return [format(date, 'yyyy-MM-dd'), format(date, 'HH:mm')].join('T');
  }

  if (type === 'date') {
    return format(date, 'yyyy-MM-dd');
  }

  if (type === 'time') {
    return format(date, 'HH:mm');
  }

  return '';
}

function formatDefaultDate(date?: Date) {
  if (!date) {
    return '';
  }

  if (!isValid(date)) {
    return '';
  }

  return format(date, 'yyyy-MM-dd');
}

function compareDateWithoutTime(dateLeft?: Date, dateRight?: Date) {
  if (!dateLeft || !dateRight) {
    return false;
  }

  if (!isValid(dateLeft) || !isValid(dateRight)) {
    return false;
  }

  return formatDefaultDate(dateLeft) === formatDefaultDate(dateRight);
}
function StringToDate(date: string) {
  const [year, month, day] = date.split('-').map((e) => Number(e));

  return toDate(new Date(year, month - 1, day, 0, 0));
}

export { StringToDate, compareDateWithoutTime, formatDate, formatDefaultDate };
