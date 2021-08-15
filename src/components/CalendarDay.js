import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { setCalendarDate, setCurrentDate, setActiveView, setLastView } from '../actions/views';
import { setStartDate, setEndDate } from '../actions/filters';
import { getDayEvents } from '../selectors/events';
import { MoreHorizontal } from '../svg/Icons';
import getHolidayList from '../utils/getHolidayList';

export const CalendarDay = (props) => {
    //console.log(props.views.calendarDate.year())
    //console.log(getHolidayList(props.views.calendarDate.year()))
    const holiday = getHolidayList(props.date.year()).find((holiday) => {
        const start = moment(props.date).startOf('day').valueOf();
        const end = moment(props.date).endOf('day').valueOf();
        const holidayDay = moment().date(holiday.date).month(holiday.month).year(props.date.year()).valueOf();

        return holidayDay >= start && holidayDay <= end && holiday.display
    });
    const events = getDayEvents(props.events, props.date);
    const selectDate = (date) => {
        const calendarDate = moment(date.valueOf());
        const currentDate = moment(date.valueOf());
        const startDate = moment(date.valueOf());
        const endDate = moment(date.valueOf()).endOf('day');
        props.setCalendarDate(calendarDate);
        props.setCurrentDate(currentDate);
        props.setStartDate(startDate);
        props.setEndDate(endDate);
        props.setLastView('');
        props.setActiveView('list');
    };
    
    return (
        <div 
            className={props.type==='current' ? "calendar-day" : "calendar-day pre-next"}
            title={props.date.format("MMM Do")}
            onClick={() => selectDate(props.date)}
            key={props.date}
            date={props.date}
        >
            <div className={props.date.format('MMDDYY') === moment().format('MMDDYY') ? 'content current-day' : 'content'}>
                <div className="day-num">{props.date.format("D")}</div>
                {holiday && 
                    <div className="holiday">
                        <div className="day-event">{holiday.name}</div>
                    </div>
                }
                {events.map((event) => (
                    <div key={event.id} className={event.color}>
                        {/* check if event is between days or starts on suday */
                            (moment(event.startDate).startOf('day') !== moment(event.endDate).startOf('day')) ? (
                                (props.date.format('dddd') !== 'Sunday' && props.date > moment(event.startDate)) ? (
                                    <div className="day-event hidden">{event.title}</div>
                                ) : (
                                    <div className="day-event">{event.title}</div>
                                )
                            ) : (
                                <div className="day-event">{event.title}</div>
                            )
                        }
                        
                    </div>
                ))}
                {(holiday && events.length >= 2) || events.length >= 3 ? <MoreHorizontal /> : <></>}
            </div>                
        </div>
    );
}

const mapStateToProps = (state) => ({
    views: state.views,
    events: state.events
});

const mapDispatchToProps = (dispatch) => ({
    setActiveView: (activeView) => dispatch(setActiveView(activeView)),
    setCalendarDate: (calendarDate) => dispatch(setCalendarDate(calendarDate)),
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate)),
    setLastView: (lastView) => dispatch(setLastView(lastView)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDay);