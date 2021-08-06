import React, { useState } from 'react';
import CalendarTypeSelector from './CalendarTypeSelector';
import TodaySelector from './TodaySelector';
import MonthSelector from './MonthSelector';
import YearSelector from './YearSelector';

const CalendarSelector = () => {
    const [monthMenuOpen, setMonthMenuOpen] = useState('');
    const [yearMenuOpen, setYearMenuOpen] = useState('');

    const onMonthMenuChange = (menuOpen) => {
        if (monthMenuOpen === ' open') {
            setMonthMenuOpen('');
        } else {
            setYearMenuOpen('');
            setMonthMenuOpen(' open');
        }
    };

    const onYearMenuChange = (menuOpen) => {
        if (yearMenuOpen === ' open') {
            setYearMenuOpen('');
        } else {
            setMonthMenuOpen('');
            setYearMenuOpen(' open');
        }
    };

    return (
        <div className="calendar-selector__wrapper content-container">
            <div className="date-selector__wrapper">
                <TodaySelector />
                <MonthSelector monthMenuOpen={monthMenuOpen} onMonthMenuChange={onMonthMenuChange} />
                <YearSelector yearMenuOpen={yearMenuOpen} onYearMenuChange={onYearMenuChange} />
            </div>
            <CalendarTypeSelector />
        </div>
    );
};

export default CalendarSelector;