import React, { useState } from 'react';
import { connect } from 'react-redux';
import { startEditEvent } from '../actions/events';
import { setActiveEvent, setActiveView, setLastView } from '../actions/views';
import { Close } from '../svg/Icons';
import EventForm from './EventForm';
import EventFormModal from './EventFormModal';

export const EditEventPage = (props) => {
    const [messages, setMessages] = useState([])
    const id = props.event.id.toString();
    
    const onSetMessages = (messages) => {
        setMessages(messages);
    };

    const closeEdit = () => {
        const lastView = props.views.lastView;
        props.setLastView('');
        props.setActiveView(lastView);
    };

    const onSubmit = (event) => {
        props.startEditEvent(
            id,
            event
        )
        if(props.views.lastView !== '') {
            props.setActiveEvent(event);
        }
        props.setLastView('')
        props.setActiveView(props.views.lastView)
    }

    const handleClearMessages = () => setMessages([]);

    return (
        <div className="calendar-edit"> 
            <button onClick={closeEdit}>
                <Close />
            </button>
            <EventForm event={props.event} onSubmit={onSubmit} onSetMessages={onSetMessages} />
            <EventFormModal
                messages={messages}
                handleClearMessages={handleClearMessages}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    event: state.views.activeEvent,
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    startEditEvent: (id, event) => dispatch(startEditEvent(id, event)),
    setActiveEvent: (event) => dispatch(setActiveEvent(event)),
    setActiveView: (activeView) => dispatch(setActiveView(activeView)),
    setLastView: (lastView) => dispatch(setLastView(lastView))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEventPage);