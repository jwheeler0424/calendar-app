import React from 'react';
import { connect } from 'react-redux';
import {
    setActiveCalendar
} from '../actions/views';

export const CalendarTypeSelector = (props) => {
    return (
        <div className="type-selector__wrapper">
            <button 
                className={
                    props.views.activeCalendar === 'weekly' ? (
                        "button button--type__active"
                    ) : (
                        "button button--type"
                    )
                }
                onClick={() => {props.setActiveCalendar('weekly')}}
            >Weekly</button>
            <button 
                className={
                    props.views.activeCalendar === 'monthly' ? (
                        "button button--type__active"
                    ) : (
                        "button button--type"
                    )
                }
                onClick={() => {props.setActiveCalendar('monthly')}}
            >Monthly</button>
            <button 
                className={
                    props.views.activeCalendar === 'yearly' ? (
                        "button button--type__active"
                    ) : (
                        "button button--type"
                    )
                }
                onClick={() => {props.setActiveCalendar('yearly')}}
            >Yearly</button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setActiveCalendar: (activeCalendar) => dispatch(setActiveCalendar(activeCalendar))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTypeSelector);