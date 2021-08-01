import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { CalendarToday } from '../svg/Icons';
import { setTodayDate } from '../actions/views';
import { setStartDate, setEndDate } from '../actions/filters';

export const TodaySelector = (props) => {
    const setToday = () => {
        const startDate = moment().startOf('day');
        const endDate = moment().endOf('day');
        props.setTodayDate();
        props.setStartDate(startDate);
        props.setEndDate(endDate);
    }
    return (
        <button className="calendar-icon__wrapper" onClick={setToday}>
            <CalendarToday className="calendar-icon__current" />
            <span>{moment().format('D')}</span>
        </button>
    )
};

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setTodayDate: () => dispatch(setTodayDate()),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodaySelector);