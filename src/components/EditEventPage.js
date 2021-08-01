import React, { useState } from 'react';
import { connect } from 'react-redux';
import { startEditEvent } from '../actions/events'
import EventForm from './EventForm';
import EventFormModal from './EventFormModal';

export const EditEventPage = (props) => {
    const [messages, setMessages] = useState([])

    const onSetMessages = (messages) => {
        setMessages(messages);
    };

    const onSubmit = (event) => {
        props.startEditEvent({
            type: 'EDIT_EVENT',
            id: props.event.id,
            event
        })
    }

    const handleClearMessages = () => setMessages([]);

    return (
        <> 
            <EventForm event={props.event} onSubmit={onSubmit} onSetMessages={onSetMessages} />
            <EventFormModal
                messages={messages}
                handleClearMessages={handleClearMessages}
            />
        </>
    );
}

const mapStateToProps = (state) => ({
    event: state.views.selectedEvent
});

const mapDispatchToProps = (dispatch) => ({
    startEditEvent: (id, event) => dispatch(startEditEvent(id, event))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEventPage);