import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CalendarDay from './CalendarDay';

export class CalendarDaily extends React.Component {
    render () {
        return (
            <div className="calendar-daily__wrapper">
                <h1>Daily</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDaily);