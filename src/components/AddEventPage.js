import React, { useState } from 'react';
import EventForm from './EventForm';
import EventFormModal from './EventFormModal';

const AddEventPage = () => {
    const [messages, setMessages] = useState([])

    const onSetMessages = (messages) => {
        setMessages(messages);
    };

    const handleClearMessages = () => setMessages([]);

    return (
        <> 
            <EventForm onSetMessages={onSetMessages} />
            <EventFormModal
                messages={messages}
                handleClearMessages={handleClearMessages}
            />
        </>
    );
}

export default AddEventPage;