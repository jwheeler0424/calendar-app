import React from 'react';
import CalendarSelector from './CalendarSelector';
import CalendarView from './CalendarView';
import CalendarAction from './CalendarAction';

const CalendarDashboardPage = () => {
    return (
        <>
            <CalendarSelector />
            <CalendarView />
            <CalendarAction />
        </>
    );
}

export { CalendarDashboardPage as default };