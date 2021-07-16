import React from 'react';
import { ExpandMore } from '@material-ui/icons'
import { connect } from 'react-redux';
import moment from 'moment';
import { setCurrentDate } from '../actions/views';

export class MonthSelector extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            monthMenuOpen: ''
        };
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
        const currentDate = moment(this.props.views.currentDate).month(month);
        this.props.setCurrentDate(currentDate.valueOf());
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
                    <span className="month-selector__title">{moment(this.props.views.currentDate).format('MMMM')}</span>
                    <ExpandMore className="material-icons" />
                </div>
                <div className={'month-selector__selector' + this.state.monthMenuOpen}>
                    <div className="month-selector__select">
                        {
                            this.getMonths().map((month) => {
                                const monthDate = moment();
                                monthDate.month(month)
                                return (
                                    <div
                                        className={monthDate.month() === moment(this.props.views.currentDate).month() ? 'selected' : ''}
                                        onClick={this.selectMonth}
                                        month={month}
                                        key={monthDate.format('MMM')}
                                    >
                                        {monthDate.format('MMM')}
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

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelector);