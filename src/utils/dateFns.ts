import { format, isValid, toDate } from "date-fns";

function formatDefaultDate(date?: Date) {
  if (!date) {
    return "";
  }

  if (!isValid(date)) {
    return "";
  }

  return format(date, "yyyy-MM-dd");
}

function formatDefaultTime(date?: Date) {
  if (!date) {
    return "";
  }

  if (!isValid(date)) {
    return "";
  }

  return format(date, "HH:mm");
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
  const [year, month, day] = date.split("-").map((e) => Number(e));

  return toDate(new Date(year, month - 1, day, 0, 0));
}

export {
  StringToDate,
  compareDateWithoutTime,
  formatDefaultDate,
  formatDefaultTime,
};
