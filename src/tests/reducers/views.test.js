import moment from 'moment';
import viewsReducer from '../../reducers/views';

test('should setup default view values', () => {
    const state = viewsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        activeCalendar: 'monthly',
        currentDate: moment().startOf('day'),
        todayDate: moment().startOf('day')
    });
});

test('should set activeCalendar view to daily', () => {
    const state = viewsReducer(undefined, { type: 'SET_ACTIVE_DAILY' });
    expect(state.activeCalendar).toBe('daily');
});

test('should set activeCalendar view to weekly', () => {
    const state = viewsReducer(undefined, { type: 'SET_ACTIVE_WEEKLY' });
    expect(state.activeCalendar).toBe('weekly');
});

test('should set activeCalendar view to monthly', () => {
    const state = viewsReducer(undefined, { type:'SET_ACTIVE_MONTHLY' });
    expect(state.activeCalendar).toBe('monthly');
});

test('should set activeCalendar view to yearly', () => {
    const state = viewsReducer(undefined, { type: 'SET_ACTIVE_YEARLY' });
    expect(state.activeCalendar).toBe('yearly');
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