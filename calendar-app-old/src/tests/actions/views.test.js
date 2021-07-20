import moment from 'moment';
import {
    setActiveDaily,
    setActiveWeekly,
    setActiveMonthly,
    setActiveYearly,
    setCurrentDate,
    setTodayDate
} from '../../actions/views';

test('should generate set active daily action object', () => {
    const action = setActiveDaily();
    expect(action).toEqual({ type: 'SET_ACTIVE_DAILY' });
});

test('should generate set active weekly action object', () => {
    const action = setActiveWeekly();
    expect(action).toEqual({ type: 'SET_ACTIVE_WEEKLY' });
});

test('should generate set active monthly action object', () => {
    const action = setActiveMonthly();
    expect(action).toEqual({ type: 'SET_ACTIVE_MONTHLY' });
});

test('should generate set active yearly action object', () => {
    const action = setActiveYearly();
    expect(action).toEqual({ type: 'SET_ACTIVE_YEARLY' });
});

test('should generate set current date action object', () => {
    const action = setCurrentDate(moment(0));
    expect(action).toEqual({
        type: 'SET_CURRENT_DATE',
        currentDate: moment(0)
    });
});

test('should generate set today date action object', () => {
    const action = setTodayDate();
    expect(action).toEqual({ type: 'SET_TODAY_DATE' });
})