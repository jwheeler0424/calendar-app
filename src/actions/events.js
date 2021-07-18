import { v4 as uuid } from 'uuid';
import events from '../tests/fixtures/events';

// ADD_EVENT
export const addEvent = (event) => ({
    type: 'ADD_EVENT',
    event
});

export const startAddEvent = (eventData = {}) => {
    return (dispatch, getState) => {
        const {
            title = '',
            startDate = 0,
            endDate = 0,
            allDay = false,
            color = 'peacock',
            location = '',
            notes = ''
        } = eventData;

        const event = { title, startDate, endDate, allDay, color, location, notes }
        dispatch(addEvent({
            id: uuid(),
            ...event
        }));
    }
}

// REMOVE_EVENT
export const removeEvent = ({ id } = {}) => ({
    type: 'REMOVE_EVENT',
    id
});

export const startRemoveEvent = ({ id } = {}) => {
    return (dispatch, getState) => {
        dispatch(removeEvent({ id }));
    }
}

// EDIT_EVENT
export const editEvent = (id, updates) => ({
    type: 'EDIT_EVENT',
    id,
    updates
});

export const startEditEvent = (id, updates) => {
    return (dispatch, getState) => {
        dispatch(editEvent(id, updates));
    }
}

// SET_EVENTS
export const setEvents = (events) => ({
    type: 'SET_EVENTS',
    events
});

export const startSetEvents = () => {
    return (dispatch, getState) => {
        
        dispatch(setEvents(events));
    }
}