import React from 'react';
import CalendarSelector from './CalendarSelector';
import CalendarView from './CalendarView';
import AddEventPage from './AddEventPage';

const CalendarDashboardPage = () => {
    return (
        <>
            <CalendarSelector />
            <CalendarView />
            {/* <AddEventPage /> */}
        </>
    );
}

export { CalendarDashboardPage as default };