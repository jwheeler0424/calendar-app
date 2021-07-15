import React from 'react';
import { NavLink } from 'react-router-dom';

export default class CalendarTypeSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCalendar: 'monthly'
        }
    }
    setActiveCalendar = (e) => {
        const activeCalendar = e.target.textContent.toLowerCase();
        this.setState(() => ({ activeCalendar }));
    }
    render() {
        return (
            <div className="calendar-selector__wrapper">
                <button 
                    className={
                        this.state.activeCalendar === 'daily' ? (
                            "calendar-selector__active"
                        ) : (
                            "calendar-selector__selector"
                        )
                    }
                    onClick={this.setActiveCalendar}
                >Daily</button>
                <button 
                    className={
                        this.state.activeCalendar === 'weekly' ? (
                            "calendar-selector__active"
                        ) : (
                            "calendar-selector__selector"
                        )
                    }
                    onClick={this.setActiveCalendar}
                >Weekly</button>
                <button 
                    className={
                        this.state.activeCalendar === 'monthly' ? (
                            "calendar-selector__active"
                        ) : (
                            "calendar-selector__selector"
                        )
                    }
                    onClick={this.setActiveCalendar}
                >Monthly</button>
                <button 
                    className={
                        this.state.activeCalendar === 'yearly' ? (
                            "calendar-selector__active"
                        ) : (
                            "calendar-selector__selector"
                        )
                    }
                    onClick={this.setActiveCalendar}
                >Yearly</button>
            </div>
        );
    }
}