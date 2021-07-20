import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigateBefore, NavigateNext } from '../svg/Icons';
import { setCurrentDate } from '../actions/views';
import CalendarDay from './CalendarDay';
import WeekDayTitle from './WeekDayTitle';

export class CalendarWeekly extends React.Component {
    getCalendarDays = (calendarDate) => {
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
    }
    getWeekDayTitles = () => {
        return ([0,1,2,3,4,5,6])
    }
    setWeekPrev = () => {
        const prevWeek = moment(this.props.views.currentDate).subtract(1, 'weeks').valueOf();
        this.props.setCurrentDate(prevWeek);
    }
    setWeekNext = () => {
        const nextWeek = moment(this.props.views.currentDate).add(1, 'weeks').valueOf();
        this.props.setCurrentDate(nextWeek);
    }
    render () {
        const prevWeek = moment(this.props.views.currentDate).subtract(1, 'weeks');
        const nextWeek = moment(this.props.views.currentDate).add(1, 'weeks');
        return (
            <div className="calendar-weekly__wrapper">
                <button onClick={this.setWeekPrev}><NavigateBefore /> {prevWeek.format('wo')} Week</button>
                <button onClick={this.setWeekNext}>{nextWeek.format('wo')} Week <NavigateNext /></button>
                <h1>{moment(this.props.views.currentDate).format('wo')} Week</h1>
                <div className="calendar-weekly__week-day-titles">
                    {this.getWeekDayTitles().map((day) => (
                        <WeekDayTitle key={moment().day(day).format('dddd')} day={day} />
                    ))}
                </div>
                <div className="calendar-weekly__week">
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWeekly);