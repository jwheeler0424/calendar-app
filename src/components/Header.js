import React from 'react';
import moment from 'moment';
import CalendarTypeSelector from './CalendarTypeSelector';
import { TodaySelector } from './TodaySelector';
import { MonthSelector } from './MonthSelector';
import { YearSelector } from './YearSelector';

export default class Header extends React.Component {
    render() {
        return (
            <header className="selector-wrapper">
                <TodaySelector />
                <MonthSelector />
                <YearSelector />
                <CalendarTypeSelector />
            </header>
        )
    }
}
