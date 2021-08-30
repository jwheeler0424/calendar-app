import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigateBefore, NavigateNext, ExpandMore } from '../svg/Icons';
import { setCalendarDate } from '../actions/views';
import { setStartDate, setEndDate } from '../actions/filters';

export const YearSelector = (props) => { 
    
    const [viewYear, setViewYear] = useState(
        props.views ? Math.floor(moment(props.views.calendarDate).year() / 10) * 10 : Math.floor(moment().year() / 10) * 10
    );
    const toggleYearSelectMenu = () => {
        props.yearMenuOpen === ' open' ? props.onYearMenuChange('') : props.onYearMenuChange(' open');
    }
    const getYears = () => {
        const years = [];

        years.push({
            type: 'pre',
            number: viewYear - 1
        });
        for(let i = viewYear; i <= viewYear + 9; i++) {
            years.push({
                type: 'current',
                number: i
            });
        };
        years.push({
            type: 'next',
            number: viewYear + 10
        });

        return years;
    }
    const setPrevYear = () => {
        setViewYear(viewYear - 10);
    }
    const setNextYear = () => {
        setViewYear(viewYear + 10);
    }
    const selectYear = (year) => {
        const calendarDate = moment(props.views.calendarDate.valueOf()).year(year);
        const startDate = moment(props.views.calendarDate.valueOf()).year(year).startOf('day');
        const endDate = moment(props.views.calendarDate.valueOf()).year(year).endOf('day');
        props.setCalendarDate(calendarDate);
        props.setStartDate(startDate);
        props.setEndDate(endDate);
        props.onYearMenuChange('');
    }
    return (
        <div className="year-selector__wrapper">
            <button className="year-selector__selected" onClick={toggleYearSelectMenu} onTouchStart={toggleYearSelectMenu}>
                <span className="year-selector__title">{moment(props.views.calendarDate).year()}</span>
                <ExpandMore className="material-icons" />
            </button>
            <div className={'year-selector__selector' + props.yearMenuOpen}>
                <div className="year-selector__nav">
                    <button className="year-selector__prev" onClick={setPrevYear} onTouchStart={setPrevYear}>
                        <NavigateBefore className="material-icons" />
                    </button>
                    <div className="year-selector__range">
                        {`
                            ${viewYear}
                            -
                            ${viewYear + 10}
                        `}
                    </div>
                    <button className="year-selector__next" onClick={setNextYear} onTouchStart={setNextYear}>
                        <NavigateNext className="material-icons" />
                    </button>
                </div>
                <div className="year-selector__select">
                    {
                        getYears().map((year) => {
                            let className;
                            if (year.type !== 'current') {
                                className = 'pre-next';
                            } else {
                                className = year.number === moment(props.views.calendarDate).year() ? 'selected' : '';
                            }

                            return (
                                <div
                                    className={className}
                                    onClick={year.type === 'current' ? () => selectYear(year.number) : () => {}}
                                    onTouchStart={year.type === 'current' ? () => selectYear(year.number) : () => {}}
                                    year={year.number}
                                    key={year.number}
                                >
                                    {year.number}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setCalendarDate: (calendarDate) => dispatch(setCalendarDate(calendarDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(YearSelector);