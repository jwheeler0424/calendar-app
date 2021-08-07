import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { setActiveEvent, setActiveView, setLastView } from '../actions/views';
import { startRemoveEvent } from '../actions/events';
import { AutoFixHigh, DeleteForever, Schedule, Place } from '../svg/Icons';

export const EventListItem = (props) => {
    const { id, title, startDate, endDate, duration, color, location } = props.event;

    const deleteEvent = () => {
        props.startRemoveEvent({ id });
    }

    const editEvent = () => {
        props.setActiveEvent(props.event);
        props.setLastView('list');
        props.setActiveView('edit');
    }

    const viewEvent = () => {
        props.setActiveEvent(props.event);
        props.setLastView('list');
        props.setActiveView('view');
    }

    return (
        <div className={`calendar-list__day-event ${color}`}>
            <div className="event-title" onClick={viewEvent}>
                <div className="event-color"></div>
                {title}
            </div>
            <div className="event-buttons-time">
                <div className="event-buttons">
                    <button onClick={editEvent} className="button button--edit"><AutoFixHigh /></button>
                    <button onClick={deleteEvent} className="button button--delete"><DeleteForever /></button>
                </div>
                { // Showing event duration
                    duration === 'time' ? (
                        <div className="event-time">
                            <Schedule /> {moment(startDate).format('h:mm a')} -  {moment(endDate).format('h:mm a')}
                        </div>
                    ) : (
                        <div className="event-time"><Schedule /> All Day</div>
                    )
                }
            </div>
            
            { // Showing event location if provided with map if address provided
                location && 
                <div className="event-location">
                    <Place /> {location.description}
                </div>
            }
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setActiveEvent: (event) => dispatch(setActiveEvent(event)),
    setActiveView: (view) => dispatch(setActiveView(view)),
    setLastView: (lastView) => dispatch(setLastView(lastView)),
    startRemoveEvent: (data) => dispatch(startRemoveEvent(data))
});

export default connect(undefined, mapDispatchToProps)(EventListItem);