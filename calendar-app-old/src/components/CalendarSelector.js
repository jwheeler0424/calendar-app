import React from 'react';
import CalendarTypeSelector from './CalendarTypeSelector';
import TodaySelector from './TodaySelector';
import MonthSelector from './MonthSelector';
import YearSelector from './YearSelector';

const CalendarSelector = () => (
    <div className="selector-wrapper">
        <TodaySelector />
        <MonthSelector />
        <YearSelector />
        <CalendarTypeSelector />
    </div>
)

export default CalendarSelector;