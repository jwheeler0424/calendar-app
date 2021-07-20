import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigateBefore, NavigateNext } from '../svg/Icons';
import { setCurrentDate } from '../actions/views';
import CalendarDay from './CalendarDay';

export class CalendarDaily extends React.Component {
    setDayPrev = () => {
        const prevDay = moment(this.props.views.currentDate).subtract(1, 'days').valueOf();
        this.props.setCurrentDate(prevDay);
    }
    setDayNext = () => {
        const nextDay = moment(this.props.views.currentDate).add(1, 'days').valueOf();
        this.props.setCurrentDate(nextDay)
    }
    render () {
        const prevDay = moment(this.props.views.currentDate).subtract(1, 'days');
        const nextDay = moment(this.props.views.currentDate).add(1, 'days');
        return (
            <div className="calendar-daily__wrapper">
                <button onClick={this.setDayPrev}><NavigateBefore /> {prevDay.format('MMM Do')}</button>
                <button onClick={this.setDayNext}>{nextDay.format('MMM Do')} <NavigateNext /></button>
                <h1>{moment(this.props.views.currentDate).format('MMMM Do, YYYY')}</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDaily);