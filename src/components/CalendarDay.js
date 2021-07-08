import React from 'react';
import moment from 'moment';

export default class CalendarDay extends React.Component {
    selectDate = () => {
        console.log(this.props.date);
    }
    render() {
        return (
            <div 
                className={this.props.type==='current' ? "month-day" : "month-day pre-next"}
                title={this.props.date.format("MMM Do")}
                onClick={this.selectDate}
            >
                <div className="content">
                    <div className="day-num">{this.props.date.format("D")}</div>
                </div>                
            </div>
        );
    }
}