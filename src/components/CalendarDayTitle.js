import React from 'react';
import moment from 'moment';

const CalendarDayTitle = (props) => {
    return (
        <div>
            {moment().day(props.day).format('ddd')}
        </div>
    );
}

export default CalendarDayTitle;