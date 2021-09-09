import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ExpandMore } from '../svg/Icons';
import { setCalendarDate } from '../actions/views';
import { setStartDate, setEndDate } from '../actions/filters';

export const MonthSelector = (props) => {
    
    const toggleMonthSelectMenu = () => {
        props.monthMenuOpen === ' open' ? props.onMonthMenuChange('') : props.onMonthMenuChange(' open');
    };

    const selectMonth = (month) => {
        const calendarDate = moment(props.views.calendarDate.valueOf()).month(month);
        const startDate = moment(props.views.calendarDate.valueOf()).month(month).startOf('day');
        const endDate = moment(props.views.calendarDate.valueOf()).month(month).endOf('day');
        props.setCalendarDate(calendarDate);
        props.setStartDate(startDate);
        props.setEndDate(endDate);
        props.onMonthMenuChange('');
    };

    const getMonths = () => {
        const months = [];
        for (let i=0; i<12; i++) {
            months.push(i)
        }
        return months;
    };

    return (
        <div className="month-selector__wrapper">
            <button className="month-selector__selected" onClick={toggleMonthSelectMenu}>
                <span className="month-selector__title">{moment(props.views.calendarDate).format('MMMM')}</span>
                <ExpandMore className="material-icons" />
            </button>
            <div className={'month-selector__selector' + props.monthMenuOpen}>
                <div className="month-selector__select">
                    {
                        getMonths().map((month) => {
                            const monthDate = moment();
                            monthDate.month(month)
                            return (
                                <div
                                    className={monthDate.month() === moment(props.views.currentDate).month() ? 'selected' : ''}
                                    onClick={() => selectMonth(month)}
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

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setCalendarDate: (calendarDate) => dispatch(setCalendarDate(calendarDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelector);