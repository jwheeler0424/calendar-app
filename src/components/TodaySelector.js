import React from 'react';
import { CalendarToday } from '@material-ui/icons'

export class TodaySelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: new Date
        };
    }
    setTodayDate = () => {
        const currentDate = new Date;
        this.setState(() => ({ currentDate }));
    }
    render() {
        const todayDate = new Date;
        return (
            <button className="calendaricon-wrapper" onClick={this.setTodayDate}>
                <CalendarToday className="calendaricon-current" />
                <span>{todayDate.getDate()}</span>
            </button>
        )
    }
};