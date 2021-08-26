import React from 'react';
import { Schedule } from '../svg/Icons';

const EventListHoliday = (props) => {
    return (
        <div className="calendar-list__day-holiday holiday">
            <div className="event-title">
                <div className="event-bullet"></div>
                {props.holiday.name}
            </div>
            <div className="event-time"><Schedule /> All Day</div>
        </div>
    );
}

export default EventListHoliday;