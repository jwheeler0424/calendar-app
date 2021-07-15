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