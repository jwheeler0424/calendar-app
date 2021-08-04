import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import getVisibleEvents from '../selectors/events';
import getHolidayList from '../utils/getHolidayList';
import { setActiveView, setLastView } from '../actions/views';
import { MoreTime } from '../svg/Icons';
import EventListHoliday from './EventListHoliday';
import EventListItem from './EventListItem';

export const EventListPage = (props) => {
    const addEvent = () => {
        props.setActiveView('add');
        props.setLastView('list')
    }
    
    const holiday = getHolidayList(props.views.currentDate.year()).find((holiday) => {
        const start = props.views.currentDate.startOf('day').valueOf();
        const end = props.views.currentDate.endOf('day').valueOf();
        const holidayDay = moment().date(holiday.date).month(holiday.month).year(props.views.currentDate.year()).valueOf();

        return holidayDay >= start && holidayDay <= end && holiday.display
    })
    
    const events = props.events;
    
    return (
        <div className="calendar-list">
            <button className="add-event" onClick={addEvent}>
                <MoreTime />
            </button>
            <h1>Events for&nbsp;
                <span className="calendar-list__event-month">{props.views.currentDate.format('MMMM')}</span>
            </h1>
            <div className="calendar-list__event-day">
                {props.views.currentDate.date()}
            </div>
            {holiday && <EventListHoliday holiday={holiday} />}
            {
                events.length > 0 ? (
                    events.map((event) => {
                        return <EventListItem event={event} key={event.id} />
                    })
                ) : (
                    <p className="calendar-list__no-event">Currently no events scheduled for this date.</p>
                )
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    views: state.views,
    events: getVisibleEvents(state.events, state.filters)
});

const mapDispatchToProps = (dispatch) => ({
    setActiveView: (activeView) => dispatch(setActiveView(activeView)),
    setLastView: (lastView) => dispatch(setLastView(lastView))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventListPage);