import moment from 'moment';

// Get visible holidays
const getVisibleHolidays = (holidays, { text, startDate, endDate }) => {
    return holidays.filter((holiday) => {
        const startDayMatch = startDate ? startDate.isSameOrBefore(holiday.startDate, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(holiday.endDate, 'day') : true;
        const textMatch = holiday.title.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        return a.startDate < b.startDate ? 1 : -1;
    });
};

export default getVisibleHolidays;