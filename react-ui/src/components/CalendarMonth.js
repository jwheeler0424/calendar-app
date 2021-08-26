import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { setActiveCalendar, setCalendarDate } from '../actions/views';
import { setStartDate, setEndDate } from '../actions/filters';
import { getDayEvents } from '../selectors/events';
import getHolidayList from '../utils/getHolidayList';

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

    const selectMonth = (date) => {
        const calendarDate = moment(date.valueOf());
        const startDate = moment(date.valueOf());
        const endDate = moment(date.valueOf()).endOf('day');
        
        props.setCalendarDate(calendarDate);
        props.setStartDate(startDate);
        props.setEndDate(endDate);
        props.setActiveCalendar('monthly');
    }
    
    return (
        <div 
            className="calendar-month"
            title={props.month.format("MMMM - YYYY")}
            onClick={() => selectMonth(props.month)}
            key={props.month}
            date={props.month}
        >
            <div className="month-days">
                {getMonthDays(props.month.valueOf()).map((day) => {
                    const holiday = getHolidayList(day.date.year()).find((holiday) => {
                        const start = moment(day.date).startOf('day').valueOf();
                        const end = moment(day.date).endOf('day').valueOf();
                        const holidayDay = moment().date(holiday.date).month(holiday.month).year(day.date.year()).valueOf();
                
                        return holidayDay >= start && holidayDay <= end && holiday.display
                    });
                    const events = getDayEvents(props.events, day.date);
                    return (
                        <div 
                            className={day.type==='current' ? "calendar-day" : "calendar-day pre-next"}
                            key={day.date.valueOf()}
                        >
                            {holiday && <div className="holiday">
                                <div className="day-event"></div>
                            </div>}
                            <div 
                                className={day.date.format('MMDDYYYY') === moment().format('MMDDYYYY') ? (
                                    'content current-day'
                                ) : (
                                    'content'
                                )}
                            >
                                {day.date.format('D')}
                            </div>
                            {events.length > 0 && <div className={events[0].color}>
                                <div className="day-event"></div>
                            </div>}
                        </div>
                    )
                }
                )}
            </div>                 
        </div>
    );
};

const mapStateToProps = (state) => ({
    views: state.views,
    events: state.events
});

const mapDispatchToProps = (dispatch) => ({
    setActiveCalendar: (activeCalendar) => dispatch(setActiveCalendar(activeCalendar)),
    setCalendarDate: (calendarDate) => dispatch(setCalendarDate(calendarDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarMonth);