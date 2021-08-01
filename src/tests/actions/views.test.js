import moment from 'moment';
import {
    setActiveCalendar,
    setActiveView,
    setCurrentDate,
    setTodayDate
} from '../../actions/views';

test('should generate set active calendar action object', () => {
    const action = setActiveCalendar('weekly');
    expect(action).toEqual({
        type: 'SET_ACTIVE_CALENDAR',
        activeCalendar: 'weekly'
    });
});

test('should generate set active view action object', () => {
    const action = setActiveView('add');
    expect(action).toEqual({
        type: 'SET_ACTIVE_VIEW',
        activeView: 'add'
    });
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