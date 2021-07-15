import React from 'react';
import { ExpandMore } from '@material-ui/icons'

export class MonthSelector extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            monthMenuOpen: '',
            currentDate: new Date
        }
    }
    toggleMonthSelectMenu = () => {
        const monthMenuOpen = this.state.monthMenuOpen === ' open' ? '' : ' open';
        this.setState(() => ({ monthMenuOpen }));
    }
    closeMonthSelectMenu = () => {
        const monthMenuOpen = '';
        this.setState(() => ({ monthMenuOpen }));
    }
    selectMonth = (e) => {
        const month = parseInt(e.target.attributes.month.value);
        const currentDate = this.state.currentDate;
        currentDate.setMonth(month);
        this.setState(() => ({ currentDate }));
        this.closeMonthSelectMenu();
    }
    getMonths = () => {
        const months = [];
        for (let i=0; i<12; i++) {
            months.push(i)
        }
        return months;
    }
    render () {
        return (
            <div className="month-selector__wrapper">
                <div className="month-selector__selected" onClick={this.toggleMonthSelectMenu}>
                    <span className="month-selector__title">{this.state.currentDate.toLocaleString('default', { month: 'long' })}</span>
                    <ExpandMore className="material-icons" />
                </div>
                <div className={'month-selector__selector' + this.state.monthMenuOpen}>
                    <div className="month-selector__select">
                        {
                            this.getMonths().map((month) => {
                                const monthDate = new Date;
                                monthDate.setMonth(month)
                                return (
                                    <div
                                        className={monthDate.getMonth() === this.state.currentDate.getMonth() ? 'selected' : ''}
                                        onClick={this.selectMonth}
                                        month={month}
                                        key={monthDate.toLocaleString('default', { month: 'short' })}
                                    >
                                        {monthDate.toLocaleString('default', { month: 'short' })}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
