import moment from 'moment';
import eventsReducer from '../../reducers/events';
import events from '../fixtures/events';

test('should setup default event values', () => {
    const state = eventsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should add event', () => {
    const event = {
        id: '4',
        title: 'Sleep',
        startDate: moment().subtract(4, 'days').valueOf(),
        endDate: moment().subtract(4, 'days').add(8, 'hours').valueOf(),
        allDay: false,
        color: 'peacock',
        location: '',
        notes: ''
    };
    const action = {
        type: 'ADD_EVENT',
        event
    };
    const state = eventsReducer(events, action);
    expect(state).toEqual([ ...events, event ]);
});

test('should edit an event', () => {
    const allDay = true;
    const action = {
        type: 'EDIT_EVENT',
        id: events[1].id,
        updates: {
            allDay
        }
    };
    const state = eventsReducer(events, action);
    expect(state[1].allDay).toBe(true)
});

test('should not edit event if event not found', () => {
    const allDay = true;
    const action = {
        type: 'EDIT_EVENT',
        id: '-1',
        updates: {
            allDay
        }
    };
    const state = eventsReducer(events, action);
    expect(state).toEqual(events)
});

test('should remove event by id', () => {
    const action = {
        type: 'REMOVE_EVENT',
        id: events[1].id
    };
    const state = eventsReducer(events, action);
    expect(state).toEqual([events[0], events[2]]);
});

test('should not remove event if id not found', () => {
    const action = {
        type: 'REMOVE_EVENT',
        id: '-1'
    };
    const state = eventsReducer(events, action);
    expect(state).toEqual(events);
});

test('should set events', () => {
    const action = {
        type: 'SET_EVENTS',
        events: [events[1]]
    };
    const state = eventsReducer(events, action);
    expect(state).toEqual([events[1]]);
});