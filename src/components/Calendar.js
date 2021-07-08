import React from 'react';
import moment from 'moment';

const currentDate = moment().add(2, 'months');
const daysInMonth = currentDate.daysInMonth();
const monthFirstDay = moment(currentDate).startOf('month');
const monthFirstDayDOW = monthFirstDay.day();
const monthLastDay = moment(currentDate).endOf('month');
const monthLastDayDOW = monthLastDay.day();
const prevMonthLastDay = moment(currentDate).subtract(1, 'months').endOf('month');
const nextMonthFirstDay = moment(currentDate).add(1, 'months').startOf('month');
const prevDays = [];
const calendarDays = [];
const nextDays = [];
for(let i=prevMonthLastDay.date() - monthFirstDayDOW + 1; i<=prevMonthLastDay.date(); i++) {
    prevDays.push(i);
}
for(let i=monthFirstDay.date(); i<=monthLastDay.date(); i++) {
    calendarDays.push(i);
}
for(let i=nextMonthFirstDay.date(); i<=(nextMonthFirstDay.date() + (6-monthLastDayDOW) - 1); i++) {
    nextDays.push(i);
}

const Calendar = () => (
    <div>
        <h1>Calendar App</h1>
        <h2>{currentDate.format('MMMM')}</h2>
        <p>{prevDays.join(',')}</p>
        <p>{calendarDays.join(',')}</p>
        <p>{nextDays.join(',')}</p>
        <p>{monthFirstDayDOW} - {monthFirstDay.format('dddd')}</p>
        <p>{}</p>
    </div>
);

export default Calendar;