import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker, TimePicker } from 'antd';
import ColorSelector from './ColorSelector';
import 'react-dates/lib/css/_datepicker.css';
import 'antd/dist/antd.css';

const EventForm = (props) => {
    const getRoundedMinute = () => {
        let minute = moment().minute();
        minute = Math.ceil(minute / 5) * 5;
        if(minute === 60) {
            minute = 0;
        }
        return minute;
    }
    const [title, setTitle] = useState(props.event ? props.event.title : '');
    const [startDate, setStartDate] = useState(
        props.event ? props.event.startDate : moment().minute(getRoundedMinute()).startOf('minute')
    );
    const [endDate, setEndDate] = useState(
        props.event ? props.event.endDate : moment().minute(getRoundedMinute()).startOf('minute').add(1, 'hour')
    );
    const [color, setColor] = useState(
        props.event ? props.event.color : 'peacock'
    );
    const disabledSeconds = [];
    for (let i=0; i<60; i++) {
        disabledSeconds.push(i);
    }
    const onTitleChange = (e) => {
        const title = e.target.value;
        setTitle(title);
    }
    const onColorChange = (color) => {
        setColor(color);
    };
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={onSubmit}>
            <div>
                <input
                    type="text"
                    name="event-title"
                    value={title}
                    onChange={onTitleChange}
                    placeholder="Title"
                    required 
                />
            </div>
            <div>
                <span>Start</span>
                <TimePicker
                    defaultValue={startDate}
                    value={startDate}
                    showNow={false}
                    format="h:mm a"
                    hideDisabledOptions={true}
                    minuteStep={5}
                    onChange={time => setStartDate(time)}
                />
                <DatePicker
                    defaultValue={startDate}
                    format={"MMM Do"}
                    showToday={false}
                    onChange={date => setStartDate(date)}
                />
            </div>
            <div>
                <span>End</span>
                <TimePicker
                    defaultValue={endDate}
                    value={endDate}
                    showNow={false}
                    format="h:mm a"
                    hideDisabledOptions={true}
                    minuteStep={5}
                    onChange={time => setEndDate(time)}
                />
                <DatePicker
                    defaultValue={startDate}
                    format={"MMM Do"}
                    showToday={false}
                    onChange={date => setEndDate(date)}
                />
            </div>
            <div>
                <span>Event Color</span>
                <ColorSelector color={color} onColorChange={onColorChange} />
            </div>
            <div>
                <input type="radio" name="event-duration" id="event-duration-hourly" value="time" defaultChecked={true} />
                <label htmlFor="event-duration-hourly" title="Select Hourly Duration">Time</label>
                <input type="radio" name="event-duration" id="event-duration-daily" value="day" />
                <label htmlFor="event-duration-daily" title="Select All Day Duration">All Day</label>
            </div>
            <div>
                <input type="text" name="event-location" placeholder="Location" title="Event Location" />
            </div>
            <button title="Save Event">Save Event</button>
        </form>
    );
}

export default EventForm;