import React from 'react';
import { connect } from 'react-redux';
import { setCurrentDate } from '../actions/views';

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
        props.setCurrentDate(date);
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

const mapDispatchToProps = (dispatch) => ({
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate))
});

export default connect(undefined, mapDispatchToProps)(CalendarDay);