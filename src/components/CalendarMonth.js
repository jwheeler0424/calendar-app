import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { setActiveCalendar, setCurrentDate } from '../actions/views';
import { setStartDate, setEndDate } from '../actions/filters';

export const  CalendarMonth = (props) => {
    const getMonthDays = (calendarDate) => {
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

    const selectMonth = (e) => {
        let date;
        if (e.target.parentElement.attributes.date) {
            date = parseInt(e.target.parentElement.attributes.date.value);
        } else if (e.target.parentElement.parentElement.attributes.date) {
            date = parseInt(e.target.parentElement.parentElement.attributes.date.value);
        } else if (e.target.parentElement.parentElement.parentElement.attributes.date) {
            date = parseInt(e.target.parentElement.parentElement.parentElement.attributes.date.value);
        }
        const startDate = moment(date).startOf('day');
        const endDate = moment(date).endOf('day');
        props.setCurrentDate(date);
        props.setStartDate(startDate);
        props.setEndDate(endDate);
        props.setActiveCalendar('month');
    }
    
    return (
        <div 
            className="calendar-yearly__month"
            title={props.month.format("MMMM - YYYY")}
            onClick={selectMonth}
            key={props.month}
            date={props.month}
        >
            <div className="content">
                <div className="month-title">{props.month.format("MMM")}</div>
                <div className="month-days">
                    {getMonthDays(props.month.valueOf()).map((day) => (
                        <div 
                            className={day.type==='current' ? "calendar-day" : "calendar-day pre-next"}
                            key={day.date.valueOf()}
                        >
                            {day.date.format('D')}
                        </div>
                    ))}
                </div>
            </div>                
        </div>
    );
};

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setActiveCalendar: (activeCalendar) => dispatch(setActiveCalendar(activeCalendar)),
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarMonth);