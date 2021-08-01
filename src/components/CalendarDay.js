import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { setCurrentDate } from '../actions/views';
import { setStartDate, setEndDate } from '../actions/filters'

export const CalendarDay = (props) => {
    const selectDate = (e) => {
        let date;
        if (e.target.parentElement.attributes.date) {
            date = parseInt(e.target.parentElement.attributes.date.value);
        } else if (e.target.parentElement.parentElement.attributes.date) {
            date = parseInt(e.target.parentElement.parentElement.attributes.date.value);
        } else if (e.target.parentElement.parentElement.parentElement.attributes.date) {
            date = parseInt(e.target.parentElement.parentElement.parentElement.attributes.date.value);
        }
        const startDate = moment(date).startOf('day');
        const endDate = moment(date).endOf('day');
        props.setCurrentDate(moment(date));
        props.setStartDate(startDate);
        props.setEndDate(endDate);
    };
    
    return (
        <div 
            className={props.type==='current' ? "calendar-day" : "calendar-day pre-next"}
            title={props.date.format("MMM Do")}
            onClick={selectDate}
            key={props.date}
            date={props.date}
        >
            <div className="content">
                <div className="day-num">{props.date.format("D")}</div>
            </div>                
        </div>
    );
}

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDay);