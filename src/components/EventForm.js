import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker, TimePicker } from 'antd';
import ColorPicker from './ColorPicker';
import LocationInput from './LocationInput';
import { validateEventForm } from '../utils/formValidators';
import getRoundedMinute from '../utils/getRoundedMinute';
import 'react-dates/lib/css/_datepicker.css';
import 'antd/dist/antd.css';

const EventForm = (props) => {    
    const [title, setTitle] = useState(props.event ? props.event.title : '');
    const [startDate, setStartDate] = useState(
        props.event ? props.event.startDate : moment().minute(getRoundedMinute()).startOf('minute').valueOf()
    );
    const [endDate, setEndDate] = useState(
        props.event ? props.event.endDate : moment().minute(getRoundedMinute()).startOf('minute').add(1, 'hour').valueOf()
    );
    const [color, setColor] = useState(
        props.event ? props.event.color : 'peacock'
    );
    const [duration, setDuration] = useState(
        props.event ? props.event.duration : 'time'
    );
    const [location, setLocation] = useState(
        props.event ? props.event.location : { 
            description: '',
            address: '',
            placeId: '',
            coordinates: {
                lat: '',
                lng: ''
            }
        }
    );
    const [notes, setNotes] = useState(
        props.event ? props.event.notes : ''
    )

    const resetEventForm = () => {
        setTitle('');
        setStartDate(moment().minute(getRoundedMinute()).startOf('minute').valueOf());
        setEndDate(moment().minute(getRoundedMinute()).startOf('minute').add(1, 'hour').valueOf());
        setColor('peacock');
        setDuration('time');
        setLocation({ 
            description: '',
            address: '',
            placeId: '',
            coordinates: {
                lat: '',
                lng: ''
            }
        });
        setNotes('');
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        const eventFields = {
            title,
            startDate,
            endDate
        }
        const eventFormMessages = validateEventForm(eventFields);

        if (eventFormMessages.length <= 0) {
            const event = {
                title,
                startDate,
                endDate,
                duration,
                color,
                location,
                notes
            };
            resetEventForm();
            props.onSubmit(event);
        } else {
            const messages = eventFormMessages.map((message) => message.content)
            props.onSetMessages(messages);
        }
    }
    
    return (
        <form onSubmit={onSubmit}>
            <div id="map"></div>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    name="event-title"
                    id="event-title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    title="Event Title"
                />
            </div>
            <div>
                <label>Start</label>
                <TimePicker
                    defaultValue={moment(startDate)}
                    value={moment(startDate)}
                    showNow={false}
                    format="h:mm a"
                    minuteStep={5}
                    onChange={time => setStartDate(time.valueOf())}
                    id="event-start-time"
                />
                <DatePicker
                    defaultValue={moment(startDate)}
                    value={moment(startDate)}
                    format={"MMM Do"}
                    showToday={false}
                    onChange={date => setStartDate(date.valueOf())}
                    id="event-start-date"
                />
            </div>
            <div>
                <label>End</label>
                <TimePicker
                    defaultValue={moment(endDate)}
                    value={moment(endDate)}
                    showNow={false}
                    format="h:mm a"
                    minuteStep={5}
                    onChange={time => setEndDate(time.valueOf())}
                    id="event-end-time"
                />
                <DatePicker
                    defaultValue={moment(endDate)}
                    value={moment(endDate)}
                    format={"MMM Do"}
                    showToday={false}
                    onChange={date => setEndDate(date.valueOf())}
                    id="event-end-date"
                />
            </div>
            <div>
                <label>Color</label>
                <ColorPicker
                    color={color}
                    onColorChange={color => setColor(color)}
                />
            </div>
            <div>
                <input
                    type="radio"
                    name="event-duration"
                    id="event-duration-hourly"
                    value="time"
                    checked={duration === 'time' ? true : false}
                    onChange={e => setDuration(e.target.value)} 
                />
                <label htmlFor="event-duration-hourly" title="Select Hourly Duration">Time</label>
                <input
                    type="radio"
                    name="event-duration"
                    id="event-duration-daily"
                    value="day"
                    checked={duration === 'day' ? true : false}
                    onChange={e => setDuration(e.target.value)} 
                />
                <label htmlFor="event-duration-daily" title="Select All Day Duration">All Day</label>
            </div>
            <div>
                <label>Location</label>
                <LocationInput
                    location={location} 
                    onLocationChange={location => setLocation(location)}
                />
            </div>
            <div>
                <label>Notes</label>
                <textarea
                    name="event-notes"
                    id="event-notes"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                ></textarea>
            </div>
            <button title="Save Event">Save Event</button>
        </form>
    );
}

export { EventForm as default };