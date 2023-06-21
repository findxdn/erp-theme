import { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  isDate,
  getDate,
  isEqual as isEqualDates,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addWeeks,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  eachWeekendOfInterval,
} from 'date-fns';

const createDayObject = (dateValue: any) => {
  return {
    dateValue,
    label: getDate(dateValue),
  };
};

function misusageThrow(methodName: any) {
  throw new Error(methodName);
}

export default function (props: any) {
  const startCurrentDateAt = props?.startCurrentDateAt;
  const startSelectedDateAt = props?.startSelectedDateAt;
  const startWeekAt = props?.startWeekAt || 0;

  const [date, setDate] = useState(
    isDate(startCurrentDateAt) ? startCurrentDateAt : new Date(),
  );
  const [selectedDate, setSelectedDate] = useState(
    isDate(startSelectedDateAt) ? startSelectedDateAt : new Date(),
  );

  const getDaysInMonth = (currentDate = date) => {
    if (!isDate(currentDate)) return;
    return eachDayOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    }).map(createDayObject);
  };

  const getWeeksInMonth = (
    currentDate = date,
    startingDayIndex = startWeekAt,
  ) => {
    if (!isDate(currentDate) || !Number.isInteger(startingDayIndex)) {
      misusageThrow('getWeeksInMonth');
    }
    const weekOptions = { weekStartsOn: startingDayIndex };
    const firstDayOfMonth = startOfMonth(currentDate);
    const firstDayOfFirstWeek = startOfWeek(firstDayOfMonth, weekOptions);
    const lastDayOfFirstWeek = endOfWeek(firstDayOfMonth, weekOptions);
    const getWeeks = (startDay: Date, endDay: Date, weekArray?: any ) : any => {
      const week = eachDayOfInterval({
        start: startDay,
        end: endDay,
      }).map(createDayObject);
      const weeks = [...weekArray, week];
      const nextWeek = addWeeks(startDay, 1);
      const firstDayNextWeek = startOfWeek(nextWeek, weekOptions);
      const lastDayNextWeek = endOfWeek(nextWeek, weekOptions);
      if (isSameMonth(firstDayNextWeek, date)) {
        return getWeeks(firstDayNextWeek, lastDayNextWeek, weeks);
      }
      return weeks;
    };
   
  return getWeeks(firstDayOfFirstWeek, lastDayOfFirstWeek);
  };

  return {
    getDaysInMonth,
    getWeeksInMonth,
    setDate,
  };
}
