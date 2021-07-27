import moment from 'moment';
import events from '../fixtures/events';
import eventsReducer from '../../reducers/events';

test('should add event', () => {
    const event = {
        id: '4',
        title: 'Sleep',
        startDate: moment().subtract(4, 'days').valueOf(),
        endDate: moment().subtract(4, 'days').add(8, 'hours').valueOf(),
        duration: 'time',
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
    const duration = 'day';
    const action = {
        type: 'EDIT_EVENT',
        id: events[1].id,
        updates: {
            duration
        }
    };
    const state = eventsReducer(events, action);
    expect(state[1].duration).toBe('day')
});

test('should not edit event if event not found', () => {
    const duration = 'day';
    const action = {
        type: 'EDIT_EVENT',
        id: '-1',
        updates: {
            duration
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

test('should populate events', () => {
    const action = {
        type: 'POPULATE_EVENTS',
        events: [events[1]]
    };
    const state = eventsReducer(events, action);
    expect(state).toEqual([events[1]]);
});