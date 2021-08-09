import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigateBefore, NavigateNext } from '../svg/Icons';
import { setCurrentDate } from '../actions/views';
import { setStartDate, setEndDate } from '../actions/filters';
import CalendarDay from './CalendarDay';

export const  CalendarWeekly = (props) => {
    const getCalendarDays = (calendarDate) => {
        const weekFirstDay = moment(calendarDate).startOf('week');
        const weekLastDay = moment(calendarDate).endOf('week');
        const calendarDays = [];
        
        for(let i=weekFirstDay.date(); i<=weekLastDay.date(); i++) {
            calendarDays.push({
                type: 'current',
                date: moment(calendarDate).date(i).startOf('day')
            });
        }
    
        return calendarDays
    };

    const setWeekPrev = () => {
        const prevWeek = moment(props.views.currentDate).subtract(1, 'weeks');
        const startDate = moment(props.views.currentDate).subtract(1, 'weeks').startOf('day');
        const endDate = moment(props.views.currentDate).subtract(1, 'weeks').endOf('day');
        props.setCurrentDate(prevWeek);
        props.setStartDate(startDate);
        props.setEndDate(endDate);
    };

    const setWeekNext = () => {
        const nextWeek = moment(props.views.currentDate).add(1, 'weeks');
        const startDate = moment(props.views.currentDate).add(1, 'weeks').startOf('day');
        const endDate = moment(props.views.currentDate).add(1, 'weeks').endOf('day');
        props.setCurrentDate(nextWeek);
        props.setStartDate(startDate);
        props.setEndDate(endDate);
    }
    
    const prevWeek = moment(props.views.currentDate).subtract(1, 'weeks');
    const nextWeek = moment(props.views.currentDate).add(1, 'weeks');

    return (
        <div className="calendar-weekly__wrapper">
            <button className="button button--nav-prev" onClick={setWeekPrev}><NavigateBefore /> {prevWeek.format('wo')} Week</button>
            <button className="button button--nav-next" onClick={setWeekNext}>{nextWeek.format('wo')} Week <NavigateNext /></button>
            <h1 className="calendar-weekly__title">
                {moment(props.views.currentDate.valueOf()).startOf('week').format('MMM Do')}
                &nbsp;-&nbsp;
                {moment(props.views.currentDate.valueOf()).endOf('week').format('MMM Do')}
            </h1>
            <div className="calender-weekly__view">
                {getCalendarDays(props.views.currentDate).map((day) => (
                    <div className="calendar-weekly__weekday">
                        <div className="weekday-title">{day.date.format('dddd')}</div>
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
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWeekly);