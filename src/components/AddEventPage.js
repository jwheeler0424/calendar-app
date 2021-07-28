import React, { useReducer, useState } from 'react';
import eventsReducer from '../reducers/events';
import EventForm from './EventForm';
import EventFormModal from './EventFormModal';

const AddEventPage = () => {
    const [events, dispatch] = useReducer(eventsReducer, []);
    
    const [messages, setMessages] = useState([])

    const onSetMessages = (messages) => {
        setMessages(messages);
    };

    const onSubmit = (event) => {
        dispatch({
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

export default AddEventPage;