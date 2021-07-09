import React from 'react';
import moment from 'moment';

export default class CalendarDayTitle extends React.Component {
    render() {
        return (
            <div>
                {moment().day(this.props.day).format('ddd')}
            </div>
        );
    }
}