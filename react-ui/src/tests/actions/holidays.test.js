import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    addHoliday,
    startAddHoliday,
    editHoliday,
    startEditHoliday,
    removeHoliday,
    startRemoveHoliday,
    populateHolidays,
    startPopulateHolidays
} from '../../actions/holidays';
import holidays from '../fixtures/holidays';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const holidaysData = {};
    holidays.forEach(({ id, name, month, date, display }) => {
        holidaysData[id] = { name, month, date, display };
    });
    database.ref(`users/${uid}/holidays`).set(holidaysData).then(() => done());
});

test('should setup add holiday object with provided values', () => {
    const action = addHoliday(holidays[2]);
    expect(action).toEqual({
        type: 'ADD_HOLIDAY',
        holiday: holidays[2]
    });
});

test('should add holiday to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const holidayData = {
        name: "StarWars Day",
        month: 4,
        date: 4,
        display: true
    };

    store.dispatch(startAddHoliday(holidayData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_HOLIDAY',
            holiday: {
                id: expect.any(String),
                ...holidayData
            }
        });

        return database.ref(`users/${uid}/holidays/${actions[0].holiday.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(holidayData);
        done();
    });
    
});

test('should add holiday with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const holidayDefaults = {
        name: '',
        month: 0,
        date: 0,
        display: false
    };

    store.dispatch(startAddHoliday({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_HOLIDAY',
            holiday: {
                id: expect.any(String),
                ...holidayDefaults
            }
        });

        return database.ref(`users/${uid}/holidays/${actions[0].holiday.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(holidayDefaults);
        done();
    });
});

test('should setup edit holiday action object', () => {
    const action = editHoliday('123abc', { name: 'New name value' });
    expect(action).toEqual({
        type: 'EDIT_HOLIDAY',
        id: '123abc',
        updates: {
            name: 'New name value'
        }
    });
});

test('should edit holiday from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = 2;
    const updates = { name: 'Holiday'};

    store.dispatch(startEditHoliday(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_HOLIDAY',
            id,
            updates
        });

        return database.ref(`users/${uid}/holidays/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().name).toBe(updates.name);
        done();
    });
    
});

test('should setup remove holiday action object', () => {
    const action = removeHoliday({ id: '123abc' });
    expect(action).toEqual({
        type: "REMOVE_HOLIDAY",
        id: '123abc'
    });
});

test('should remove holiday from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = '2';

    store.dispatch(startRemoveHoliday({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_HOLIDAY',
            id
        });

        return database.ref(`users/${uid}/holidays/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
    
});

test('should setup populate holidays action object', () => {
    const action = populateHolidays(holidays);
    expect(action).toEqual({
        type: 'POPULATE_HOLIDAYS',
        holidays
    });
});

test('should fetch holidays from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startPopulateHolidays()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'POPULATE_HOLIDAYS',
            holidays
        });
        done();
    });
});