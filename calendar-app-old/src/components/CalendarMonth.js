import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { setActiveMonthly, setCurrentDate } from '../actions/views';

export class CalendarMonth extends React.Component {
    getMonthDays = (calendarDate) => {
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
    selectMonth = (e) => {
        let date;
        if (e.target.parentElement.attributes.date) {
            date = parseInt(e.target.parentElement.attributes.date.value);
        } else if (e.target.parentElement.parentElement.attributes.date) {
            date = parseInt(e.target.parentElement.parentElement.attributes.date.value);
        } else if (e.target.parentElement.parentElement.parentElement.attributes.date) {
            date = parseInt(e.target.parentElement.parentElement.parentElement.attributes.date.value);
        }
        this.props.setCurrentDate(date);
        this.props.setActiveMonthly();
    }
    render() {
        return (
            <div 
                className="calendar-yearly__month"
                title={this.props.month.format("MMMM - YYYY")}
                onClick={this.selectMonth}
                key={this.props.month}
                date={this.props.month}
            >
                <div className="content">
                    <div className="month-title">{this.props.month.format("MMM")}</div>
                    <div className="month-days">
                        {this.getMonthDays(this.props.month.valueOf()).map((day) => (
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
};

const mapDispatchToProps = (dispatch) => ({
    setActiveMonthly: () => dispatch(setActiveMonthly()),
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate))
});

export default connect(undefined, mapDispatchToProps)(CalendarMonth);