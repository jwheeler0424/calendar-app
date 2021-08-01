import React from 'react';
import { connect } from 'react-redux';
import getVisibleEvents from '../selectors/events';
import { MoreTime } from '../svg/Icons'

export const ListEventsPage = (props) => {
    return (
        <div className="calendar-list">
            <button className="add-event">
                <MoreTime />
            </button>
            <h1>Events for&nbsp;
                <span className="calendar-list__event-month">{props.views.currentDate.format('MMMM')}</span>
            </h1>
            <div className="calendar-list__event-day">
                {props.views.currentDate.date()}
            </div>
            <div>Event List</div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    views: state.views,
    events: getVisibleEvents(state.events, state.filters),
    holidays: getVisibleEvents(state.holidays, state.filters)
});

export default connect(mapStateToProps)(ListEventsPage);