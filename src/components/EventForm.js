import React from 'react';
import moment from 'moment';

export default class EventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }
    onSubmit = (e) => {
        e.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                
            </form>
        );
    }
}