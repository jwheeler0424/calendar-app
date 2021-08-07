import React from 'react';
import { connect } from 'react-redux';
import CalendarSelector from './CalendarSelector';
import CalendarView from './CalendarView';
import CalendarAction from './CalendarAction';

const CalendarDashboardPage = (props) => {
    return (
        <main>
            <CalendarSelector />
            <div className ="calendar-active__wrapper content-container">
                <CalendarView />
                {props.views.activeView && <CalendarAction />}
            </div>
        </main>
    );
}

const mapStateToProps = (state) => ({
    views: state.views
});

export default connect(mapStateToProps)(CalendarDashboardPage);