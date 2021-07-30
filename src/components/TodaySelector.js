import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { CalendarToday } from '../svg/Icons';
import { setTodayDate } from '../actions/views';

export const TodaySelector = (props) => {
    return (
        <button className="calendar-icon__wrapper" onClick={props.setTodayDate}>
            <CalendarToday className="calendar-icon__current" />
            <span>{moment().format('D')}</span>
        </button>
    )
};

const mapDispatchToProps = (dispatch) => ({
    setTodayDate: () => dispatch(setTodayDate())
});

export default connect(undefined, mapDispatchToProps)(TodaySelector);