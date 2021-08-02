// SET_ACTIVE_CALENDAR
export const setActiveCalendar = (activeCalendar) => ({
    type: 'SET_ACTIVE_CALENDAR',
    activeCalendar
});

// SET_ACTIVE_VIEW
export const setActiveView = (activeView) => ({
    type: 'SET_ACTIVE_VIEW',
    activeView
});

// SET_ACTIVE_EVENT
export const setActiveEvent = (activeEvent) => ({
    type: 'SET_ACTIVE_EVENT',
    activeEvent
});

// SET_LAST_VIEW
export const setLastView = (lastView) => ({
    type: 'SET_LAST_VIEW',
    lastView
});

// SET_CURRENT_DATE
export const setCurrentDate = (currentDate) => ({
    type: 'SET_CURRENT_DATE',
    currentDate
});

// SET_TODAY_DATE
export const setTodayDate = () => ({
    type: 'SET_TODAY_DATE'
});