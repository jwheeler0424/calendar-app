import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { DatePicker, TimePicker } from 'antd';
import ColorPicker from './ColorPicker';
import LocationInput from './LocationInput';
import { validateEventForm } from '../utils/formValidators';
import getRoundedMinute from '../utils/getRoundedMinute';

export const EventForm = (props) => {    
    const [title, setTitle] = useState(props.event ? props.event.title : '');
    console.log(props.currentDate)
    const [startDate, setStartDate] = useState(
        props.event ? props.event.startDate : props.currentDate.minute(getRoundedMinute()).startOf('minute').valueOf()
    );
    const [endDate, setEndDate] = useState(
        props.event ? props.event.endDate : props.currentDate.minute(getRoundedMinute()).startOf('minute').add(1, 'hour').valueOf()
    );
    const [color, setColor] = useState(
        props.event ? props.event.color : 'peacock'
    );
    const [duration, setDuration] = useState(
        props.event ? props.event.duration : 'time'
    );
    const [location, setLocation] = useState(
        props.event ? props.event.location : ''
    );
    const [notes, setNotes] = useState(
        props.event ? props.event.notes : ''
    )

    const resetEventForm = () => {
        setTitle('');
        setStartDate(props.currentDate.minute(getRoundedMinute()).startOf('minute').valueOf());
        setEndDate(props.currentDate.minute(getRoundedMinute()).startOf('minute').add(1, 'hour').valueOf());
        setColor('peacock');
        setDuration('time');
        setLocation('');
        setNotes('');
    }

    const onTimeChange = (time) => {
        setStartDate(time.valueOf());
        setEndDate(time.add(1, 'hour').valueOf());
    }

    const onDateChange = (date) => {
        setStartDate(date.valueOf())
        setEndDate(date.add(1, 'hour').valueOf())
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
            let start, end
            if (duration === 'day') {
                start = moment(startDate).startOf('day').valueOf();
                end = moment(endDate).endOf('day').valueOf();
            } else {
                start = startDate;
                end = endDate;
            }
            const event = {
                title,
                startDate: start,
                endDate: end,
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
        <form onSubmit={onSubmit} className="calendar-form__wrapper">
            <div className="calendar-form__title">
                <input
                    type="text"
                    name="event-title"
                    id="event-title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    title="Event Title"
                />
                <label>Title</label>
            </div>
            <div className="calendar-form__start">
                <div>
                    {duration === 'time' && <TimePicker
                        defaultValue={moment(startDate)}
                        value={moment(startDate)}
                        className="time"
                        showNow={false}
                        format="h:mm a"
                        minuteStep={5}
                        onChange={time => onTimeChange(time)}
                        id="event-start-time"
                    />}
                    <DatePicker
                        defaultValue={moment(startDate)}
                        value={moment(startDate)}
                        className="date"
                        format={"MMM Do"}
                        showToday={false}
                        onChange={date => onDateChange(date)}
                        id="event-start-date"
                    />
                </div>
                <label>Start</label>
            </div>
            <div className="calendar-form__end">
                <div>
                    {duration === 'time' && <TimePicker
                        defaultValue={moment(endDate)}
                        value={moment(endDate)}
                        className="time"
                        showNow={false}
                        format="h:mm a"
                        minuteStep={5}
                        onChange={time => setEndDate(time.valueOf())}
                        id="event-end-time"
                    />}
                    <DatePicker
                        defaultValue={moment(endDate)}
                        value={moment(endDate)}
                        className="date"
                        format={"MMM Do"}
                        showToday={false}
                        onChange={date => setEndDate(date.valueOf())}
                        id="event-end-date"
                    />
                </div>
                <label>End</label>
            </div>
            <div className="calendar-form__color-duration">
                <div className="color">
                    <ColorPicker
                        color={color}
                        onColorChange={color => setColor(color)}
                    />
                    <label>Color</label>
                </div>
                <div className="duration">
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
                    <label>Duration</label>
                </div>
            </div>
            <div className="calendar-form__location">
                <LocationInput
                    location={location} 
                    onLocationChange={location => setLocation(location)}
                />
                <label>Location</label>
            </div>
            <div className="calendar-form__notes">
                <textarea
                    name="event-notes"
                    id="event-notes"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows="3"
                ></textarea>
                <label>Notes</label>
            </div>
            <div className="calendar-form__save">
                <button title="Save Event" className="button button--save">Save Event</button>
            </div>
        </form>
    );
}

const mapStateToProps = (state) => ({
    currentDate: state.views.currentDate
});

export default connect(mapStateToProps)(EventForm);