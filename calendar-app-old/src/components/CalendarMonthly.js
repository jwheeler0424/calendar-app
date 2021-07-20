import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigateBefore, NavigateNext } from '../svg/Icons';
import { setCurrentDate } from '../actions/views';
import CalendarDay from './CalendarDay';
import WeekDayTitle from './WeekDayTitle';

export class CalendarMonthly extends React.Component {
    getCalendarDays = (calendarDate) => {
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
    getWeekDayTitles = () => {
        return ([0,1,2,3,4,5,6])
    }
    setMonthPrev = () => {
        const prevMonth = moment(this.props.views.currentDate).subtract(1, 'months').valueOf();
        this.props.setCurrentDate(prevMonth);
    }
    setMonthNext = () => {
        const nextMonth = moment(this.props.views.currentDate).add(1, 'months').valueOf();
        this.props.setCurrentDate(nextMonth);
    }
    render() {
        const prevMonth = moment(this.props.views.currentDate).subtract(1, 'months');
        const nextMonth = moment(this.props.views.currentDate).add(1, 'months');
        return (
            <div className="calendar-monthly__wrapper">
                <button onClick={this.setMonthPrev}><NavigateBefore /> {prevMonth.format('MMMM')}</button>
                <button onClick={this.setMonthNext}>{nextMonth.format('MMMM')} <NavigateNext /></button>
                <h1>{moment(this.props.views.currentDate).format('MMMM YYYY')}</h1>
                <div className="calendar-monthly__week-day-titles">
                    {this.getWeekDayTitles().map((day) => (
                        <WeekDayTitle key={moment().day(day).format('dddd')} day={day} />
                    ))}
                </div>
                <div className="calendar-monthly__month">
                    {this.getCalendarDays(this.props.views.currentDate).map((day) => (
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

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarMonthly);