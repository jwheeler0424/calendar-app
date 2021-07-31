import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigateBefore, NavigateNext } from '../svg/Icons';
import { setCurrentDate } from '../actions/views';
import CalendarMonth from './CalendarMonth';

export const CalendarYearly = (props) => {
    const getCalendarMonths = (calendarDate) => {
        const yearFirstMonth = moment(calendarDate).startOf('year');
        const yearLastMonth = moment(calendarDate).endOf('year');
        const calendarMonths = [];
        
        for(let i=yearFirstMonth.month(); i<=yearLastMonth.month(); i++) {
            calendarMonths.push({
                type: 'current',
                date: moment(calendarDate).month(i).startOf('month')
            });
        }
    
        return calendarMonths
    };

    const setYearPrev = () => {
        const prevYear = moment(props.views.currentDate).subtract(1, 'years').valueOf();
        props.setCurrentDate(prevYear);
    };

    const setYearNext = () => {
        const nextYear = moment(props.views.currentDate).add(1, 'years').valueOf();
        props.setCurrentDate(nextYear);
    };

    const prevYear = moment(props.views.currentDate).subtract(1, 'years');
    const nextYear = moment(props.views.currentDate).add(1, 'years');
    
    return (
        <div className="calendar-yearly__wrapper">
            <button onClick={setYearPrev}><NavigateBefore /> {prevYear.format('YYYY')}</button>
            <button onClick={setYearNext}>{nextYear.format('YYYY')} <NavigateNext /></button>
            <h1>{moment(props.views.currentDate).format('YYYY')}</h1>
            <div className="calendar-yearly__year">
                {getCalendarMonths(props.views.currentDate).map((month) => (
                    <CalendarMonth 
                        month={month.date}
                        key={month.date.valueOf()}
                        type={month.type}
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
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarYearly);