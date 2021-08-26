import moment from 'moment';

// Get visible events
export const getVisibleEvents = (events, { text, sortBy, startDate, endDate }) => {
    return events.filter((event) => {
        const eventStart = moment(event.startDate);
        const eventEnd = moment(event.endDate);
        const startDateMatch = startDate ? startDate.isSameOrAfter(eventStart, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrBefore(eventEnd, 'day') : true;
        const textMatch = event.title.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'date':
                return a.startDate < b.startDate ? -1 : 1;
            default: 
                return a.startDate < b.startDate ? -1 : 1;
        }
    });
}

export const getDayEvents = (events, date) => {
    return events.filter((event) => {
        const eventStart = moment(event.startDate);
        const eventEnd = moment(event.endDate);
        const startDateMatch = date ? date.isSameOrAfter(eventStart, 'day') : true;
        const endDateMatch = date ? date.isSameOrBefore(eventEnd, 'day') : true;

        return startDateMatch && endDateMatch
    }).sort((a, b) => {
        return a.startDate < b.startDate ? -1 : 1;
    });
};