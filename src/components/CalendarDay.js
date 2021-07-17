import React from 'react';
import { connect } from 'react-redux';
import { setActiveDaily, setCurrentDate } from '../actions/views';

export class CalendarDay extends React.Component {
    selectDate = (e) => {
        let date;
        if (e.target.parentElement.attributes.date) {
            date = parseInt(e.target.parentElement.attributes.date.value);
        } else if (e.target.parentElement.parentElement.attributes.date) {
            date = parseInt(e.target.parentElement.parentElement.attributes.date.value);
        } else if (e.target.parentElement.parentElement.parentElement.attributes.date) {
            date = parseInt(e.target.parentElement.parentElement.parentElement.attributes.date.value);
        }
        this.props.setCurrentDate(date);
        this.props.setActiveDaily();
    }
    render() {
        return (
            <div 
                className={this.props.type==='current' ? "calendar-day" : "calendar-day pre-next"}
                title={this.props.date.format("MMM Do")}
                onClick={this.selectDate}
                key={this.props.date}
                date={this.props.date}
            >
                <div className="content">
                    <div className="day-num">{this.props.date.format("D")}</div>
                </div>                
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setActiveDaily: () => dispatch(setActiveDaily()),
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate))
});

export default connect(undefined, mapDispatchToProps)(CalendarDay);