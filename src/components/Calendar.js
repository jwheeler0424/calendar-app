import React from 'react';
import moment from 'moment';

const currentDate = moment();

const getCalendarDays = (month) => {
    const daysInMonth = month.daysInMonth();
    const monthFirstDay = moment(month).startOf('month');
    const monthFirstDayDOW = monthFirstDay.day();
    const monthLastDay = moment(month).endOf('month');
    const monthLastDayDOW = monthLastDay.day();
    const prevMonthLastDay = moment(month).subtract(1, 'months').endOf('month');
    const nextMonthFirstDay = moment(month).add(1, 'months').startOf('month');
    const calendarDays = [];

    for(let i=prevMonthLastDay.date() - monthFirstDayDOW + 1; i<=prevMonthLastDay.date(); i++) {
        calendarDays.push({
            type: 'pre',
            date: i
        });
    }
    for(let i=monthFirstDay.date(); i<=monthLastDay.date(); i++) {
        calendarDays.push({
            type: 'current',
            date: i
        });
    }
    for(let i=nextMonthFirstDay.date(); i<=(nextMonthFirstDay.date() + (6-monthLastDayDOW) - 1); i++) {
        calendarDays.push({
            type: 'next',
            date: i
        });
    }

    return calendarDays
}

const monthDays = getCalendarDays(currentDate);
console.log(monthDays)
const Calendar = () => (
    <div>
        <h1>Calendar App</h1>
        <h2>{currentDate.format('MMMM')}</h2>
        {monthDays.map((day) => (`${day.date} `))}
    </div>
);

export default Calendar;