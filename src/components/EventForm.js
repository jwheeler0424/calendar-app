import React from 'react';
import moment from 'moment';
import SelectColor from './SelectColor';

export default class EventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }
    onSubmit = (e) => {
        e.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <input type="text" name="event-title" placeholder="Title" required />
                </div>
                <div>
                    <span>Start</span>
                    <input type="time" name="start-time" required />
                    <input type="date" name="start-date" required />
                </div>
                <div>
                    <span>End</span>
                    <input type="time" name="end-time" required />
                    <input type="date" name="end-date" required />
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
}