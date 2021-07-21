import React, { useState } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import SelectColor from './SelectColor';
import 'react-dates/lib/css/_datepicker.css';

const EventForm = () => {
    const [startDate, setStartDate] = useState(moment().startOf('day'));
    const [startFocused, setStartFocused] = useState(false);
    const [endDate, setEndDate] = useState(moment().endOf('day'));
    const [endFocused, setEndFocused] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={onSubmit}>
            <div>
                <input type="text" name="event-title" placeholder="Title" required />
            </div>
            <div>
                <span>Start</span>
                <input type="time" name="start-time" required />
                <SingleDatePicker 
                    date={startDate}
                    onDateChange={(date) => setStartDate(date)}
                    focused={startFocused}
                    onFocusChange={() => setStartFocused(!startFocused)}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    id="start-date"
                />
            </div>
            <div>
                <span>End</span>
                <input type="time" name="end-time" required />
                <SingleDatePicker 
                    date={endDate}
                    onDateChange={(date) => setEndDate(date)}
                    focused={endFocused}
                    onFocusChange={() => setEndFocused(!startFocused)}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    id="end-date"
                />
            </div>
            <div>
                <span>Event Color</span>
                <SelectColor />
            </div>
            <div>
                <input type="radio" name="event-duration" id="event-duration-hourly" value="time" checked />
                <label for="event-duration-hourly" title="Select Hourly Duration">Time</label>
                <input type="radio" name="event-duration" id="event-duration-daily" value="day" />
                <label for="event-duration-daily" title="Select All Day Duration">All Day</label>
            </div>
            <div>
                <input type="text" name="event-location" placeholder="Location" title="Event Location" />
            </div>
            <button title="Save Event">Save Event</button>
        </form>
    );
}

export default EventForm;