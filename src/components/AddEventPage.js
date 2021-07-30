import React, { useState } from 'react';
import { connect } from 'react-redux';
import { startAddEvent } from '../actions/events'
import EventForm from './EventForm';
import EventFormModal from './EventFormModal';

export const AddEventPage = (props) => {
    const [messages, setMessages] = useState([])

    const onSetMessages = (messages) => {
        setMessages(messages);
    };

    const onSubmit = (event) => {
        props.startAddEvent({
            type: 'ADD_EVENT',
            event
        })
    }

    const handleClearMessages = () => setMessages([]);

    return (
        <> 
            <EventForm onSubmit={onSubmit} onSetMessages={onSetMessages} />
            <EventFormModal
                messages={messages}
                handleClearMessages={handleClearMessages}
            />
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    startAddEvent: (event) => dispatch(startAddEvent)
});

export default connect(undefined, mapDispatchToProps)(AddEventPage);