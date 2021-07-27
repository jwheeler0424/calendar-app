const validateEventForm = (e) => {
    const form = e.target;
    
    const eventTitle = form[0];
    const eventStartTime = form[1];
    const eventStartDate = form[2];
    const eventEndTime = form[3];
    const eventEndDate = form[4];
    const messages = [];

    if (!eventTitle.value || eventTitle.value.length < 1) {
        messages.push('Please enter a title for the event.');
        eventTitle.classList.add('invalid-error');
    } else {
        eventTitle.classList.remove('invalid-error');
    }

    if (eventStartTime.value.length < 1) {
        messages.push('Please select a time for the event to start.');
        eventStartTime.classList.add('invalid-error');
    } else {
        eventStartTime.classList.remove('invalid-error')
    }

    if (eventStartDate.value.length < 1) {
        messages.push('Please select a date for the event to start.');
        eventStartDate.classList.add('invalid-error');
    } else {
        eventStartDate.classList.remove('invalid-error')
    }

    if (eventEndTime.value.length < 1) {
        messages.push('Please select a time for the event to end.');
        eventEndTime.classList.add('invalid-error');
    } else {
        eventEndTime.classList.remove('invalid-error')
    }

    if (eventEndDate.value.length < 1) {
        messages.push('Please select a date for the event to end.');
        eventEndDate.classList.add('invalid-error');
    } else {
        eventEndDate.classList.remove('invalid-error')
    }

    return messages;
}

export { validateEventForm };