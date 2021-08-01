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

    const getWeekDayTitles = () => {
        return ([0,1,2,3,4,5,6])
    };

    const setWeekPrev = () => {
        const prevWeek = moment(props.views.currentDate).subtract(1, 'weeks').valueOf();
        const startDate = moment(props.views.currentDate).subtract(1, 'weeks').startOf('day');
        const endDate = moment(props.views.currentDate).subtract(1, 'weeks').endOf('day');
        props.setCurrentDate(prevWeek);
        props.setStartDate(startDate);
        props.setEndDate(endDate);
    };

    const setWeekNext = () => {
        const nextWeek = moment(props.views.currentDate).add(1, 'weeks').valueOf();
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
            <button onClick={setWeekPrev}><NavigateBefore /> {prevWeek.format('wo')} Week</button>
            <button onClick={setWeekNext}>{nextWeek.format('wo')} Week <NavigateNext /></button>
            <h1>{moment(props.views.currentDate).format('wo')} Week</h1>
            <div className="calendar-weekly__week-day-titles">
                {getWeekDayTitles().map((day) => (
                    <div key={moment().day(day).format('ddd')}>
                        {moment().day(day).format('ddd')}
                    </div>
                ))}
            </div>
            <div className="calendar-weekly__week">
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWeekly);