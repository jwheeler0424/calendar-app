import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { startAddEvent } from '../actions/events';
import { setActiveView, setLastView } from '../actions/views';
import { Close } from '../svg/Icons';
import EventForm from './EventForm';
import EventFormModal from './EventFormModal';

export const AddEventPage = (props) => {
    const [messages, setMessages] = useState([])

    const onSetMessages = (messages) => {
        setMessages(messages);
    };

    const closeAdd = () => {
        props.setActiveView('list');
        props.setLastView('');
    };

    const onSubmit = (event) => {
        console.log(moment(event.startDate).format(), moment(event.endDate).format());
        props.startAddEvent(event);
        props.setActiveView('list');
    };

    const handleClearMessages = () => setMessages([]);

    return (
        <div className="calendar-add">
            <button onClick={closeAdd} className="button button--close">
                <Close />
            </button>
            <h1 className="calendar-add__title">Schedule Event</h1>
            <EventForm onSubmit={onSubmit} onSetMessages={onSetMessages} />
            <EventFormModal
                messages={messages}
                handleClearMessages={handleClearMessages}
            />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    startAddEvent: (event) => dispatch(startAddEvent(event)),
    setActiveView: (activeView) => dispatch(setActiveView(activeView)),
    setLastView: (lastView) => dispatch(setLastView(lastView))
});

export default connect(undefined, mapDispatchToProps)(AddEventPage);