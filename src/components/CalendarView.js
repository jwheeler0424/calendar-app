import React from 'react';
import { connect } from 'react-redux';
import CalendarWeekly from './CalendarWeekly';
import CalendarMonthly from './CalendarMonthly';
import CalendarYearly from './CalendarYearly';

export const CalendarView = (props) => {
    switch (props.views.activeCalendar) {
        case 'weekly':
            return (<CalendarWeekly />);
        case 'monthly':
            return (<CalendarMonthly />);
        case 'yearly':
            return (<CalendarYearly />);
        default: 
            return (<CalendarMonthly />)
    };
}

const mapStateToProps = (state) => ({
    views: state.views
});

export default connect(mapStateToProps)(CalendarView);