import React, { useState } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { DatePicker, TimePicker } from 'antd';
import SelectColor from './SelectColor';
import 'react-dates/lib/css/_datepicker.css';
import 'antd/dist/antd.css';

const EventForm = (props) => {
    const [title, setTitle] = useState(props.event ? props.event.title : '');
    const [startDate, setStartDate] = useState(props.event ? props.event.startDate : moment());
    const [startFocused, setStartFocused] = useState(false);
    const [endDate, setEndDate] = useState(props.event ? props.event.endDate : moment().endOf('day'));
    const [endFocused, setEndFocused] = useState(false);
    const onTitleChange = (e) => {
        const title = e.target.value;
        setTitle(title);
    }
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={onSubmit}>
            <div>
                <input type="text" name="event-title" value={title} onChange={onTitleChange} placeholder="Title" required />
            </div>
            <div>
                <span>Start</span>
                {/* <input type="time" name="start-time" required /> */}
                <TimePicker defaultValue={startDate} showNow={false} />
                <DatePicker defaultValue={startDate} format={"MMM Do"} showToday={false} />
                {/* <SingleDatePicker 
                    date={startDate}
                    onDateChange={(date) => setStartDate(date)}
                    focused={startFocused}
                    onFocusChange={() => setStartFocused(!startFocused)}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    id="start-date"
                /> */}
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