import holidays from '../tests/fixtures/holidays';
import getNthDayOfMonth from './getNthDayOfMonth';

const getHolidayList = (props) => {
    const holidayList = holidays.map((holiday) => {
        const date = typeof(holiday.date) === 'number' ? holiday.date : getNthDayOfMonth(holiday.date.n, holiday.date.day, holiday.month, 2022)
        return {
            name: holiday.name,
            month: holiday.month,
            date: date,
            display: holiday.display
        };
    });

    return holidayList;
}

export { getHolidayList as default }