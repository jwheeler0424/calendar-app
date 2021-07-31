import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ExpandMore } from '../svg/Icons';
import { setCurrentDate } from '../actions/views';

export const MonthSelector = (props) => {
    const [monthMenuOpen, setMonthMenuOpen] = useState('');
    
    const toggleMonthSelectMenu = () => {
        monthMenuOpen === ' open' ? setMonthMenuOpen('') : setMonthMenuOpen(' open');
    };

    const selectMonth = (e) => {
        const month = parseInt(e.target.attributes.month.value);
        const currentDate = moment(props.views.currentDate).month(month);
        props.setCurrentDate(currentDate.valueOf());
        setMonthMenuOpen('');
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
            <div className="month-selector__selected" onClick={toggleMonthSelectMenu}>
                <span className="month-selector__title">{moment(props.views.currentDate).format('MMMM')}</span>
                <ExpandMore className="material-icons" />
            </div>
            <div className={'month-selector__selector' + monthMenuOpen}>
                <div className="month-selector__select">
                    {
                        getMonths().map((month) => {
                            const monthDate = moment();
                            monthDate.month(month)
                            return (
                                <div
                                    className={monthDate.month() === moment(props.views.currentDate).month() ? 'selected' : ''}
                                    onClick={selectMonth}
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
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelector);