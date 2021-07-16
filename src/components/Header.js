import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import CalendarTypeSelector from './CalendarTypeSelector';
import TodaySelector from './TodaySelector';
import MonthSelector from './MonthSelector';
import YearSelector from './YearSelector';

const Header = () => (
    <header className="selector-wrapper">
        <TodaySelector />
        <MonthSelector />
        <YearSelector />
        <CalendarTypeSelector />
    </header>
)

export default Header;