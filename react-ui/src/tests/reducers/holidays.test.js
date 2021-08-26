import holidays from '../fixtures/holidays';
import holidaysReducer from '../../reducers/holidays';

test('should setup default holiday values', () => {
    const state = holidaysReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should add a holiday', () => {
    const holiday = {
        id: '20',
        name: "StarWars Day",
        month: 4,
        date: 4,
        display: true
    };
    const action = {
        type: 'ADD_HOLIDAY',
        holiday
    };
    const state = holidaysReducer(holidays, action);
    expect(state).toEqual([ ...holidays, holiday ]);
});

test('should edit a holiday', () => {
    const name = 'Holiday';
    const action = {
        type: 'EDIT_HOLIDAY',
        id: holidays[1].id,
        updates: {
            name
        }
    };
    const state = holidaysReducer(holidays, action);
    expect(state[1].name).toBe('Holiday');
});

test('should not edit holiday if holiday not found', () => {
    const name = 'Holiday';
    const action = {
        type: 'EDIT_HOLIDAY',
        id: '-1',
        updates: {
            name
        }
    };
    const state = holidaysReducer(holidays, action);
    expect(state).toEqual(holidays)
});

test('should remove holiday by id', () => {
    const action = {
        type: 'REMOVE_HOLIDAY',
        id: holidays[1].id
    };
    const state = holidaysReducer(holidays, action);
    expect(state).toEqual(
        [
            holidays[0], holidays[2], holidays[3],
            holidays[4], holidays[5], holidays[6],
            holidays[7], holidays[8], holidays[9],
            holidays[10], holidays[11], holidays[12],
            holidays[13], holidays[14], holidays[15],
            holidays[16], holidays[17], holidays[18],
            holidays[19]
        ]
    );
});

test('should not remove holiday if id not found', () => {
    const action = {
        type: 'REMOVE_HOLIDAY',
        id: '-1'
    };
    const state = holidaysReducer(holidays, action);
    expect(state).toEqual(holidays);
});

test('should populate holidays', () => {
    const action = {
        type: 'POPULATE_HOLIDAYS',
        holidays: [holidays[1]]
    };
    const state = holidaysReducer(holidays, action);
    expect(state).toEqual([holidays[1]]);
});