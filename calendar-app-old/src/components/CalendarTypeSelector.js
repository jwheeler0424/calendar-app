import React from 'react';
import { connect } from 'react-redux';
import {
    setActiveDaily,
    setActiveWeekly,
    setActiveMonthly,
    setActiveYearly
} from '../actions/views';

export const CalendarTypeSelector = (props) => {
    return (
        <div className="calendar-selector__wrapper">
            <button 
                className={
                    props.views.activeCalendar === 'daily' ? (
                        "calendar-selector__active"
                    ) : (
                        "calendar-selector__selector"
                    )
                }
                onClick={props.setActiveDaily}
            >Daily</button>
            <button 
                className={
                    props.views.activeCalendar === 'weekly' ? (
                        "calendar-selector__active"
                    ) : (
                        "calendar-selector__selector"
                    )
                }
                onClick={props.setActiveWeekly}
            >Weekly</button>
            <button 
                className={
                    props.views.activeCalendar === 'monthly' ? (
                        "calendar-selector__active"
                    ) : (
                        "calendar-selector__selector"
                    )
                }
                onClick={props.setActiveMonthly}
            >Monthly</button>
            <button 
                className={
                    props.views.activeCalendar === 'yearly' ? (
                        "calendar-selector__active"
                    ) : (
                        "calendar-selector__selector"
                    )
                }
                onClick={props.setActiveYearly}
            >Yearly</button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setActiveDaily: () => dispatch(setActiveDaily()),
    setActiveWeekly: () => dispatch(setActiveWeekly()),
    setActiveMonthly: () => dispatch(setActiveMonthly()),
    setActiveYearly: () => dispatch(setActiveYearly())
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTypeSelector);