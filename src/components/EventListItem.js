import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { setActiveEvent, setLastView } from '../actions/views';
import { AutoFixHigh, DeleteForever, Schedule } from '../svg/Icons';

export const EventListItem = (props) => {
    const { id, title, startDate, endDate, duration, color, location, notes } = props.event;

    const deleteEvent = () => {

    }

    const editEvent = () => {

    }

    const viewEvent = () => {

    }

    return (
        <div className={`calendar-list__day-event ${color}`} key={id}>
            <button onClick={editEvent}><AutoFixHigh /></button>
            <button onClick={deleteEvent}><DeleteForever /></button>
            <div className="event-title" onClick={viewEvent}>{title}</div>
            {
                duration === 'time' ? (
                    <div className="event-time">
                        <Schedule /> {moment(startDate).format('h:mm a')} -  {moment(endDate).format('h:mm a')}
                    </div>
                ) : (
                    <div className="event-time"><Schedule /> All Day</div>
                )
            }
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setActiveEvent: (event) => dispatch(setActiveEvent(event)),
    setLastView: (lastView) => dispatch(setLastView(lastView))
});

export default connect(undefined, mapDispatchToProps)(EventListItem);