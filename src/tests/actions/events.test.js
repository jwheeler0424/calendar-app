import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    addEvent,
    startAddEvent,
    editEvent,
    startEditEvent,
    removeEvent,
    startRemoveEvent,
    setEvents,
    startSetEvents
} from '../../actions/events';
import events from '../fixtures/events';

const createMockStore = configureMockStore([thunk]);

test('should setup add event object with provided values', () => {
    const action = addEvent(events[2]);
    expect(action).toEqual({
        type: 'ADD_EVENT',
        event: events[2]
    });
});

test('should add event to store', () => {
    const store = createMockStore();
    const eventData = {
        title: 'Party',
        startDate: 650440540,
        endDate: 650440990,
        allDay: false,
        color: 'peacock',
        location: '',
        notes: 'This one is better'
    };
    store.dispatch(startAddEvent(eventData));
    const actions = store.getActions();
    
    expect(actions[0]).toEqual({
        type: 'ADD_EVENT',
        event: {
            id: expect.any(String),
            ...eventData
        }
    });
});

test('should add event with defaults to store', () => {
    const store = createMockStore();
    const eventDefaults = {
        title: '',
        startDate: 0,
        endDate: 0,
        allDay: false,
        color: 'peacock',
        location: '',
        notes: ''
    };

    store.dispatch(startAddEvent({}));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'ADD_EVENT',
        event: {
            id: expect.any(String),
            ...eventDefaults
        }
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

test('should exit expense from store', () => {
    const store = createMockStore();
    const id = events[0].id;
    const updates = { allDay: true};

    store.dispatch(startEditEvent(id, updates));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'EDIT_EVENT',
        id,
        updates
    });
});

test('should setup remove event action object', () => {
    const action = removeEvent({ id: '123abc' });
    expect(action).toEqual({
        type: "REMOVE_EVENT",
        id: '123abc'
    });
});

test('should remove event from store', () => {
    const store = createMockStore();
    const id = events[1].id;

    store.dispatch(startRemoveEvent({ id }));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'REMOVE_EVENT',
        id
    });
})

test('should setup set events action object', () => {
    const action = setEvents(events);
    expect(action).toEqual({
        type: 'SET_EVENTS',
        events
    });
});

test('should fetch events from store', () => {
    const store = createMockStore();
    store.dispatch(startSetEvents());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'SET_EVENTS',
        events
    });
})