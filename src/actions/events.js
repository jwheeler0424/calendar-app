import { v4 as uuid } from 'uuid';
import database from '../firebase/firebase';

// ADD_EVENT
export const addEvent = (event) => ({
    type: 'ADD_EVENT',
    event
});

export const startAddEvent = (eventData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
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

        return database.ref(`users/${uid}/events`).push(event).then((ref) => {
            dispatch(addEvent({
                id: ref.key,
                ...event
            }));
        });
    }
}

// REMOVE_EVENT
export const removeEvent = ({ id } = {}) => ({
    type: 'REMOVE_EVENT',
    id
});

export const startRemoveEvent = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/events/${id}`).remove().then((ref) => {
            dispatch(removeEvent({ id }));
        });
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
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/events/${id}`).update(updates).then((ref) => {
            dispatch(editEvent(id, updates));
        });
    }
}

// SET_EVENTS
export const setEvents = (events) => ({
    type: 'SET_EVENTS',
    events
});

export const startSetEvents = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/events`).once('value').then((snapshot) => {
            const eventCollection = [];
            
            snapshot.forEach((childSnapshot) => {
                eventCollection.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            
            dispatch(setEvents(eventCollection));
        });
    };
};