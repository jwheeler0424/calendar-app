import React from 'react';
import moment from 'moment';

const currentDate = moment();

const Calendar = () => (
    <div>
        <h1>Calendar App</h1>
        <h2>{currentDate.format('MMMM')}</h2>
        <p>My first calendar component.</p>
    </div>
);

export default Calendar;