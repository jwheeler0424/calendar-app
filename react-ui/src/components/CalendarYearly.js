import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigateBefore, NavigateNext } from '../svg/Icons';
import { setCalendarDate } from '../actions/views';
import { setStartDate, setEndDate } from '../actions/filters';
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
        const prevYear = moment(props.views.calendarDate.valueOf()).subtract(1, 'years');
        props.setCalendarDate(prevYear);
    };

    const setYearNext = () => {
        const nextYear = moment(props.views.calendarDate.valueOf()).add(1, 'years');
        props.setCalendarDate(nextYear);
    };

    const prevYear = moment(props.views.calendarDate).subtract(1, 'years');
    const nextYear = moment(props.views.calendarDate).add(1, 'years');
    
    return (
        <div className="calendar-yearly__wrapper">
            <button className="button button--nav-prev" onClick={setYearPrev}><NavigateBefore /> {prevYear.format('YYYY')}</button>
            <button className="button button--nav-next" onClick={setYearNext}>{nextYear.format('YYYY')} <NavigateNext /></button>
            <h1 className="calendar-yearly__title">{moment(props.views.calendarDate).format('YYYY')}</h1>
            <div className="calendar-yearly__view">
                {getCalendarMonths(props.views.calendarDate).map((month) => (
                    <div 
                        className={
                            moment().startOf('month').format('MMDDYYYY') === moment(month.date.valueOf()).format('MMDDYYYY') ? (
                                "calendar-yearly__month current-month"
                            ) : (
                                "calendar-yearly__month"
                            )
                        }
                        key={month.date.format('MMMM')}
                    > 
                        <div className="month-title">{month.date.format('MMMM')}</div>
                        <CalendarMonth 
                            month={month.date}
                            key={month.date.valueOf()}
                            type={month.type}
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarYearly);