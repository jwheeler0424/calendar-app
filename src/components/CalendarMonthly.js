import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigateBefore, NavigateNext } from '../svg/Icons';
import { setCurrentDate } from '../actions/views';
import { setStartDate, setEndDate } from '../actions/filters';
import CalendarDay from './CalendarDay';

export const CalendarMonthly = (props) => {
    const getCalendarDays = (calendarDate) => {
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
    };

    const getWeekDayTitles = () => {
        return ([0,1,2,3,4,5,6])
    };

    const setMonthPrev = () => {
        const prevMonth = moment(props.views.currentDate).subtract(1, 'months');
        props.setCurrentDate(prevMonth);
    };

    const setMonthNext = () => {
        const nextMonth = moment(props.views.currentDate).add(1, 'months');
        props.setCurrentDate(nextMonth);
    };

    const prevMonth = moment(props.views.currentDate).subtract(1, 'months');
    const nextMonth = moment(props.views.currentDate).add(1, 'months');
    
    return (
        <div className={props.views.activeView ? 'calendar-monthly__wrapper hide-mobile' : 'calendar-monthly__wrapper'}>
            <button className="button button--nav-prev" onClick={setMonthPrev}><NavigateBefore /> {prevMonth.format('MMMM')}</button>
            <button className="button button--nav-next" onClick={setMonthNext}>{nextMonth.format('MMMM')} <NavigateNext /></button>
            <h1 className="calendar-monthly__title">{moment(props.views.currentDate).format('MMMM YYYY')}</h1>
            <div className="calendar-monthly__weekday-titles">
                {getWeekDayTitles().map((day) => (
                    <div key={moment().day(day).format('ddd')}>
                        {moment().day(day).format('ddd')}
                    </div>
                ))}
            </div>
            <div className="calendar-monthly__month">
                {getCalendarDays(props.views.currentDate).map((day) => (
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

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarMonthly);