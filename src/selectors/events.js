import moment from 'moment';

/*
Need to figure out how to import the views reducer to update start and end match
*/

// Get visible events
const getVisibleEvents = (events, { text, startDate, endDate }) => {
    return events.filter((event) => {
        const startDateMatch = startDate ? startDate.isSameOrBefore(event.startDate, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(event.endDate, 'day') : true;
        const textMatch = event.title.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        return a.startDate < b.startDate ? 1 : -1;
    });
};

export default getVisibleEvents;