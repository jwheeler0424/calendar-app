import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { setCurrentDate } from '../actions/views';
import CalendarMonth from './CalendarMonth';

export class CalendarYearly extends React.Component {
    getCalendarMonths = (calendarDate) => {
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
    }
    setYearPrev = () => {
        const prevYear = moment(this.props.views.currentDate).subtract(1, 'years').valueOf();
        this.props.setCurrentDate(prevYear);
    }
    setYearNext = () => {
        const nextYear = moment(this.props.views.currentDate).add(1, 'years').valueOf();
        this.props.setCurrentDate(nextYear);
    }
    render () {
        const prevYear = moment(this.props.views.currentDate).subtract(1, 'years');
        const nextYear = moment(this.props.views.currentDate).add(1, 'years');
        return (
            <div className="calendar-yearly__wrapper">
                <button onClick={this.setYearPrev}><NavigateBefore /> {prevYear.format('YYYY')}</button>
                <button onClick={this.setYearNext}>{nextYear.format('YYYY')} <NavigateNext /></button>
                <h1>{moment(this.props.views.currentDate).format('YYYY')}</h1>
                <div className="calendar-yearly__year">
                    {this.getCalendarMonths(this.props.views.currentDate).map((month) => (
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
}

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarYearly);