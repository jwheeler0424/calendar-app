import React from 'react';
import { connect } from 'react-redux';
import AddEventPage from './AddEventPage';
import EditEventPage from './EditEventPage';
import ViewEventPage from './ViewEventPage';
import EventListPage from './EventListPage';

export const CalendarAction = (props) => {
    switch (props.views.activeView) {
        case 'list':
            return (<EventListPage />);
        case 'add':
            return (<AddEventPage />);
        case 'edit':
            return (<EditEventPage />);
        case 'view':
            return (<ViewEventPage />);
        default:
            console.log(window.innerWidth)
            if(window.innerWidth >= 1172) {
                return (<EventListPage />)
            } else {
                return (<></>);
            }
    }
}

const mapStateToProps = (state) => ({
    views: state.views
});

export default connect(mapStateToProps)(CalendarAction);