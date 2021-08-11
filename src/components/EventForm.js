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
    const [startDate, setStartDate] = useState(
        props.event ? moment(props.event.startDate) : moment(props.currentDate.valueOf()).minute(getRoundedMinute()).hour(moment().hour()).startOf('minute')
    );
    const [startTime, setStartTime] = useState(
        props.event ? moment(props.event.startDate) : moment(props.currentDate.valueOf()).minute(getRoundedMinute()).hour(moment().hour()).startOf('minute')
    );
    const [endDate, setEndDate] = useState(
        props.event ? moment(props.event.endDate) : moment(props.currentDate.valueOf()).minute(getRoundedMinute()).hour(moment().hour()).startOf('minute').add(1, 'hour')
    );
    const [endTime, setEndTime] = useState(
        props.event ? moment(props.event.endDate) : moment(props.currentDate.valueOf()).minute(getRoundedMinute()).hour(moment().hour()).startOf('minute').add(1, 'hour')
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
        setStartDate(props.currentDate.minute(getRoundedMinute()).hour(moment().hour()).startOf('minute'));
        setStartTime(props.currentDate.minute(getRoundedMinute()).hour(moment().hour()).startOf('minute'));
        setEndDate(props.currentDate.minute(getRoundedMinute()).hour(moment().hour()).startOf('minute').add(1, 'hour'));
        setEndTime(props.currentDate.minute(getRoundedMinute()).hour(moment().hour()).startOf('minute').add(1, 'hour'));
        setColor('peacock');
        setDuration('time');
        setLocation('');
        setNotes('');
    }

    const onStartDateChange = (date) => {
        if (date) {
            setStartDate(date);
            if(date > endDate) {
                setEndDate(date);
            }
        } else {
            setStartDate(null);
        }
    }

    const onStartTimeChange = (time) => {
        if (time) {
            setStartTime(time);
            setEndTime(time.add(1, 'hour'));
        } else {
            setStartTime(null);
        }
    };

    const onEndDateChange = (date) => {
        if (date) {
            setEndDate(date);
            if (date < startDate) {
                if (startDate) {
                    setEndDate(startDate);
                } else {
                    setEndDate(null)
                }
            }
        } else {
            setEndDate(null);
        }
    };

    const onEndTimeChange = (time) => {
        if (time) {
            setEndTime(time);
            if (time < startTime) {
                if (startTime) {
                    setEndTime(startTime.add(5, 'minutes'));
                } else {
                    setEndTime(null);
                }
            }
        } else {
            setEndTime(null)
        }
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
                start = moment(startDate.valueOf()).startOf('day').valueOf();
                end = moment(endDate.valueOf()).endOf('day').valueOf();
            } else {
                start = startDate.valueOf();
                end = endDate.valueOf();
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
                        defaultValue={startTime}
                        value={startTime}
                        className="time"
                        showNow={false}
                        format="h:mm a"
                        minuteStep={5}
                        onChange={time => onStartTimeChange(time)}
                        id="event-start-time"
                    />}
                    <DatePicker
                        defaultValue={startDate}
                        value={startDate}
                        className="date"
                        format={"MMM Do"}
                        showToday={false}
                        onChange={date => onStartDateChange(date)}
                        id="event-start-date"
                    />
                </div>
                <label>Start</label>
            </div>
            <div className="calendar-form__end">
                <div>
                    {duration === 'time' && <TimePicker
                        defaultValue={endTime}
                        value={endTime}
                        className="time"
                        showNow={false}
                        format="h:mm a"
                        minuteStep={5}
                        onChange={time => onEndTimeChange(time)}
                        id="event-end-time"
                    />}
                    <DatePicker
                        defaultValue={endDate}
                        value={endDate}
                        className="date"
                        format={"MMM Do"}
                        showToday={false}
                        onChange={date => onEndDateChange(date)}
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
    calendarDate: state.views.calendarDate,
    currentDate: state.views.currentDate
});

export default connect(mapStateToProps)(EventForm);