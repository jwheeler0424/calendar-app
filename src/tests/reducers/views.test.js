import moment from 'moment';
import viewsReducer from '../../reducers/views';

test('should setup default view values', () => {
    const state = viewsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        activeCalendar: 'monthly',
        activeView: 'list',
        activeLast: '',
        currentDate: 0
    });
});

test('should set activeCalendar view to weekly', () => {
    const action = {
        type: 'SET_ACTIVE_CALENDAR',
        activeCalendar: 'weekly'
    }
    const state = viewsReducer(undefined, action);
    expect(state.activeCalendar).toBe('weekly');
});

test('should set activeCalendar view to yearly', () => {
    const action = {
        type: 'SET_ACTIVE_CALENDAR',
        activeCalendar: 'yearly'
    }
    const state = viewsReducer(undefined, action);
    expect(state.activeCalendar).toBe('yearly');
});

test('should set activeView view to add', () => {
    const action = {
        type: 'SET_ACTIVE_VIEW',
        activeView: 'add'
    }
    const state = viewsReducer(undefined, action);
    expect(state.activeView).toBe('add');
});

test('should set activeView view to edit', () => {
    const action = {
        type: 'SET_ACTIVE_VIEW',
        activeView: 'edit'
    }
    const state = viewsReducer(undefined, action);
    expect(state.activeView).toBe('edit');
});

test('should set activeView view to view', () => {
    const action = {
        type: 'SET_ACTIVE_VIEW',
        activeView: 'view'
    }
    const state = viewsReducer(undefined, action);
    expect(state.activeView).toBe('view');
});

test('should set lastView view to add', () => {
    const action = {
        type: 'SET_LAST_VIEW',
        activeView: 'add'
    }
    const state = viewsReducer(undefined, action);
    expect(state.lastView).toBe('add');
});

test('should set currentDate to given date', () => {
    const currentDate = moment(0);
    const action = { type: 'SET_CURRENT_DATE', currentDate};
    const state = viewsReducer(undefined, action);
    expect(state.currentDate).toEqual(currentDate);
});

test('should set currentDate to todays date', () => {
    const todayDate = moment().startOf('day');
    const state = viewsReducer(undefined, { type: 'SET_TODAY_DATE' });
    expect(state.currentDate).toEqual(todayDate);
});