import React from 'react';
import { connect } from 'react-redux';
import AddEventPage from './AddEventPage';
import EditEventPage from './EditEventPage';
import ListEventsPage from './ListEventsPage';

export const CalendarAction = (props) => {
    switch (props.views.activeView) {
        case 'list':
            return (<ListEventsPage />);
        case 'add':
            return (<AddEventPage />);
        case 'edit':
            return (<EditEventPage />);
        case 'view':
            return (<></>);
        default:
            return (<></>);
    }
}

const mapStateToProps = (state) => ({
    views: state.views
});

export default connect(mapStateToProps)(CalendarAction);