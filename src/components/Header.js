import React from 'react';
import moment from 'moment';
import { CalendarToday, MenuOpen } from '@material-ui/icons'
import CalendarTypeSelector from './CalendarTypeSelector';

export default class Header extends React.Component {
    render() {
        return (
            <div className="selector-wrapper">
                <button className="calendaricon-wrapper">
                    <CalendarToday className="calendaricon-current" />
                    <span>{moment().format('DD')}</span>
                </button>
                <div>DateSelectorMonth</div>
                <div>DateSelectorYear</div>
                <button>
                    <MenuOpen />
                </button>
                <CalendarTypeSelector />
            </div>
        )
    }
}
