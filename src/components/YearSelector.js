import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigateBefore, NavigateNext, ExpandMore } from '../svg/Icons';
import { setCurrentDate } from '../actions/views';
import { setStartDate, setEndDate } from '../actions/filters';

export const YearSelector = (props) => { 
    const [yearMenuOpen, setYearMenuOpen] = useState('');
    const [viewYear, setViewYear] = useState(
        props.views ? Math.floor(moment(props.views.currentDate).year() / 10) * 10 : Math.floor(moment().year() / 10) * 10
    );
    const toggleYearSelectMenu = () => {
        yearMenuOpen === ' open' ? setYearMenuOpen('') : setYearMenuOpen(' open');
    }
    const getYears = () => {
        const years = [];

        years.push({
            type: 'pre',
            number: viewYear - 1
        });
        for(let i = viewYear; i <= viewYear + 10; i++) {
            years.push({
                type: 'current',
                number: i
            });
        };
        years.push({
            type: 'next',
            number: viewYear + 11
        });

        return years;
    }
    const setPrevYear = () => {
        setViewYear(viewYear - 10);
    }
    const setNextYear = () => {
        setViewYear(viewYear + 10);
    }
    const selectYear = (e) => {
        const year = parseInt(e.target.attributes.year.value);
        const currentDate = moment(props.views.currentDate).year(year);
        const startDate = moment(props.views.currentDate).year(year).startOf('day');
        const endDate = moment(props.views.currentDate).year(year).endOf('day');
        props.setCurrentDate(currentDate);
        props.setStartDate(startDate);
        props.setEndDate(endDate);
        setYearMenuOpen('');
    }
    return (
        <div className="year-selector__wrapper">
            <div className="year-selector__selected" onClick={toggleYearSelectMenu}>
                <span className="year-selector__title">{moment(props.views.currentDate).year()}</span>
                <ExpandMore className="material-icons" />
            </div>
            <div className={'year-selector__selector' + yearMenuOpen}>
                <div className="year-selector__nav">
                    <button className="year-selector__prev" onClick={setPrevYear}>
                        <NavigateBefore className="material-icons" />
                    </button>
                    <div className="year-selector__range">
                        {`
                            ${viewYear}
                            -
                            ${viewYear + 10}
                        `}
                    </div>
                    <button className="year-selector__next" onClick={setNextYear}>
                        <NavigateNext className="material-icons" />
                    </button>
                </div>
                <div className="year-selector__select">
                    {
                        getYears().map((year, index) => {
                            let className;
                            if (year.type !== 'current') {
                                className = 'pre-next';
                            } else {
                                className = year.number === moment(props.views.currentDate).year() ? 'selected' : '';
                            }

                            return (
                                <div
                                    className={className}
                                    onClick={year.type === 'current' ? selectYear : () => {}}
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
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(YearSelector);