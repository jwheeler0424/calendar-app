import React from 'react';

export default class CalendarTypeSelector extends React.Component {
    render() {
        return (
            <div className="type-selector-wrapper">
                <ul className="type-selector">
                    <li>Daily</li>
                    <li>Weekly</li>
                    <li className="calendar-active">Monthly</li>
                    <li>Yearly</li>
                </ul>
            </div>
        );
    }
}