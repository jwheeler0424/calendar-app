import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import {
    addEvent,
    startAddEvent,
    editEvent,
    startEditEvent,
    removeEvent,
    startRemoveEvent,
    populateEvents,
    startPopulateEvents
} from '../../actions/events';
import events from '../fixtures/events';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const eventsData = {};
    events.forEach(({ id, title, startDate, endDate, duration, color, location, notes }) => {
        eventsData[id] = { title, startDate, endDate, duration, color, location, notes };
    });
    database.ref(`users/${uid}/events`).set(eventsData).then(() => done());
});

test('should setup add event object with provided values', () => {
    const action = addEvent(events[2]);
    expect(action).toEqual({
        type: 'ADD_EVENT',
        event: events[2]
    });
});

test('should add event to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const eventData = {
        title: 'Party',
        startDate: moment().add(52, 'years').add(1, 'hours').valueOf(),
        endDate: moment().add(52, 'years').add(2, 'hours').valueOf(),
        duration: 'time',
        color: 'peacock',
        location: { 
            description: '',
            address: '',
            placeId: '',
            coordinates: {
                lat: '',
                lng: ''
            }
        },
        notes: 'This one is better'
    };

    store.dispatch(startAddEvent(eventData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EVENT',
            event: {
                id: expect.any(String),
                ...eventData
            }
        });

        return database.ref(`users/${uid}/events/${actions[0].event.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(eventData);
        done();
    });
    
});

test('should add event with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const eventDefaults = {
        title: '',
        startDate: 0,
        endDate: 0,
        duration: 'time',
        color: 'peacock',
        location: { 
            description: '',
            address: '',
            placeId: '',
            coordinates: {
                lat: '',
                lng: ''
            }
        },
        notes: ''
    };

    store.dispatch(startAddEvent({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EVENT',
            event: {
                id: expect.any(String),
                ...eventDefaults
            }
        });

        return database.ref(`users/${uid}/events/${actions[0].event.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(eventDefaults);
        done();
    });
});

test('should setup edit event action object', () => {
    const action = editEvent('123abc', { note: 'New note value' });
    expect(action).toEqual({
        type: 'EDIT_EVENT',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});

test('should edit event from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = events[0].id;
    const updates = { duration: 'day'};

    store.dispatch(startEditEvent(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EVENT',
            id,
            updates
        });

        return database.ref(`users/${uid}/events/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().duration).toBe(updates.duration);
        done();
    });
    
});

test('should setup remove event action object', () => {
    const action = removeEvent({ id: '123abc' });
    expect(action).toEqual({
        type: "REMOVE_EVENT",
        id: '123abc'
    });
});

test('should remove event from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = events[1].id;

    store.dispatch(startRemoveEvent({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EVENT',
            id
        });

        return database.ref(`users/${uid}/events/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
    
})

test('should setup populate events action object', () => {
    const action = populateEvents(events);
    expect(action).toEqual({
        type: 'POPULATE_EVENTS',
        events
    });
});

test('should fetch events from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startPopulateEvents()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'POPULATE_EVENTS',
            events
        });
        done();
    });
});