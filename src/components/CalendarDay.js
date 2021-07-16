import React from 'react';
import moment from 'moment';

const selectDate = (e) => {
    const date = e.target.parentElement.attributes.date.value;
    console.log(date);
}

const CalendarDay = (props) => {
    return (
        <div 
            className={props.type==='current' ? "month-day" : "month-day pre-next"}
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

export default CalendarDay;