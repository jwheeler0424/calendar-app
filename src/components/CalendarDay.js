import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { setCurrentDate, setActiveView, setLastView } from '../actions/views';
import { setStartDate, setEndDate } from '../actions/filters';

export const CalendarDay = (props) => {
    const selectDate = (date) => {
        const currentDate = moment().set({'date': date.date(), 'month': date.month(), 'year': date.year()});
        const startDate = moment(date.valueOf());
        const endDate = moment(date.valueOf()).endOf('day');
        props.setCurrentDate(currentDate);
        props.setStartDate(startDate);
        props.setEndDate(endDate);
        props.setLastView('');
        props.setActiveView('list');
    };
    
    return (
        <div 
            className={props.type==='current' ? "calendar-day" : "calendar-day pre-next"}
            title={props.date.format("MMM Do")}
            onClick={() => selectDate(props.date)}
            key={props.date}
            date={props.date}
        >
            <div className={props.date.format('MMDDYY') === moment().format('MMDDYY') ? 'content current-day' : 'content'}>
                <div className="day-num">{props.date.format("D")}</div>
            </div>                
        </div>
    );
}

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setActiveView: (activeView) => dispatch(setActiveView(activeView)),
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate)),
    setLastView: (lastView) => dispatch(setLastView(lastView)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDay);