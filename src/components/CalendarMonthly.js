import React from 'react';
import moment from 'moment';
import CalendarDay from './CalendarDay';
import CalendarDayTitle from './CalendarDayTitle';
import { NavigateBefore, NavigateNext } from '@material-ui/icons'

const currentDate = moment().add(2, 'months');

export default class CalendarMonthly extends React.Component {
    getCalendarDays = (calendarDate) => {
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
    getCalendarDayTitles = () => {
        return ([0,1,2,3,4,5,6])
    }
    render() {
        return (
            <div className="calendar">
                <button><NavigateBefore /> {moment(currentDate).subtract(1, 'months').format('MMMM')}</button>
                <button>{moment(currentDate).add(1, 'months').format('MMMM')} <NavigateNext /></button>
                <h2>{currentDate.format('MMMM YYYY')}</h2>
                <div className="calendar__day-titles">
                    {this.getCalendarDayTitles().map((day) => (
                        <CalendarDayTitle key={moment().day(day).format('dddd')} day={day} />
                    ))}
                </div>
                <div className="calendar__month">
                    {this.getCalendarDays(currentDate).map((day) => (
                        <CalendarDay 
                            date={day.date}
                            key={day.date.valueOf()}
                            type={day.type}
                        />
                    ))}
                </div>
            </div>
        );
    }
}