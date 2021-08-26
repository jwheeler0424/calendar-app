import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigateBefore, NavigateNext } from '../svg/Icons';
import { setCalendarDate } from '../actions/views';
import { setStartDate, setEndDate } from '../actions/filters';
import CalendarDay from './CalendarDay';

export const  CalendarWeekly = (props) => {
    const getCalendarDays = (calendarDate) => {
        const calendarDays = [];
        
        for(let i=0; i<=6; i++) {
            calendarDays.push({
                type: 'current',
                date: moment(calendarDate.valueOf()).startOf('week').add(i, 'days').startOf('day')
            });
        }
    
        return calendarDays
    };

    const setWeekPrev = () => {
        const prevWeek = moment(props.views.calendarDate.valueOf()).subtract(1, 'weeks');
        props.setCalendarDate(prevWeek);
    };

    const setWeekNext = () => {
        const nextWeek = moment(props.views.calendarDate.valueOf()).add(1, 'weeks');
        props.setCalendarDate(nextWeek);
    }
    
    const prevWeek = moment(props.views.calendarDate).subtract(1, 'weeks');
    const nextWeek = moment(props.views.calendarDate).add(1, 'weeks');

    return (
        <div className={props.views.activeView ? 'calendar-weekly__wrapper hide-mobile' : 'calendar-weekly__wrapper'}>
            <button className="button button--nav-prev" onClick={setWeekPrev}><NavigateBefore /> {prevWeek.format('wo')} Week</button>
            <button className="button button--nav-next" onClick={setWeekNext}>{nextWeek.format('wo')} Week <NavigateNext /></button>
            <h1 className="calendar-weekly__title">
                {moment(props.views.calendarDate.valueOf()).startOf('week').format('MMM Do')}
                &nbsp;-&nbsp;
                {moment(props.views.calendarDate.valueOf()).endOf('week').format('MMM Do')}
            </h1>
            <div className="calender-weekly__view">
                {getCalendarDays(props.views.calendarDate).map((day) => (
                    <div className="calendar-weekly__weekday" key={day.date.format('MMDDYYYY')}>
                        {moment().format('MMDDYYYY') === moment(day.date.valueOf()).format('MMDDYYYY') ? (
                            <div className="weekday-title current-date">{day.date.format('dddd')}</div>
                        ) : (
                            <div className="weekday-title">{day.date.format('dddd')}</div>
                        )}
                        <CalendarDay 
                            date={day.date}
                            key={day.date.valueOf()}
                            type={day.type}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setCalendarDate: (calendarDate) => dispatch(setCalendarDate(calendarDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWeekly);