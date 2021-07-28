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
            duration = 'time',
            color = 'peacock',
            location = { 
                description: '',
                address: '',
                placeId: '',
                coordinates: {
                    lat: '',
                    lng: ''
                }
            },
            notes = ''
        } = eventData;

        const event = { title, startDate, endDate, duration, color, location, notes }

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
export const populateEvents = (events) => ({
    type: 'POPULATE_EVENTS',
    events
});

export const startPopulateEvents = () => {
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
            
            dispatch(populateEvents(eventCollection));
        });
    };
};