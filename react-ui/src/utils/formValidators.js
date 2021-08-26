const validateEventForm = ({ title, startDate, endDate }) => {
    const messages = [];

    if (!title || title === '') {
        messages.push({
            content: 'Please enter a title for the event.',
            element: 'title'
        });
    }

    if (!startDate || startDate === '') {
        messages.push({
            content: 'Please select a date for the event to start.',
            element: 'startDate'
        });
    }

    if (!endDate || endDate === '') {
        messages.push({
            content: 'Please select a date for the event to end.',
            element: 'endDate'
        });
    }

    return messages;
}

export { validateEventForm };