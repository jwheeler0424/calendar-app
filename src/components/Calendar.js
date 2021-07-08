import React from 'react';
import moment from 'moment';

const currentDate = moment();

const getCalendarDays = (calendarDate) => {
    const daysInMonth = calendarDate.daysInMonth();
    const monthFirstDay = moment(calendarDate).startOf('month');
    const monthFirstDayDOW = monthFirstDay.day();
    const monthLastDay = moment(calendarDate).endOf('month');
    const monthLastDayDOW = monthLastDay.day();
    const prevMonthLastDay = moment(calendarDate).subtract(1, 'months').endOf('month');
    const nextMonthFirstDay = moment(calendarDate).add(1, 'months').startOf('month');
    const calendarDays = [];
    
    for(let i=prevMonthLastDay.date() - monthFirstDayDOW + 1; i<=prevMonthLastDay.date(); i++) {
        calendarDays.push({
            type: 'pre',
            date: moment(prevMonthLastDay).date(i).startOf('day')
        });
    }
    for(let i=monthFirstDay.date(); i<=monthLastDay.date(); i++) {
        calendarDays.push({
            type: 'current',
            date: moment(calendarDate).date(i).startOf('day')
        });
    }
    for(let i=nextMonthFirstDay.date(); i<=(nextMonthFirstDay.date() + (6-monthLastDayDOW) - 1); i++) {
        calendarDays.push({
            type: 'next',
            date: moment(nextMonthFirstDay).date(i).startOf('day')
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
        {monthDays.map((day) => (<p>{day.date.format()}</p>))}
    </div>
);

export default Calendar;