import React from 'react';
import { NavigateBefore, NavigateNext, ExpandMore } from '@material-ui/icons'

export class YearSelector extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {
            yearMenuOpen: '',
            currentDate: new Date,
            viewYear: new Date,
            yearNum: 0
        }
    }
    toggleYearSelectMenu = () => {
        const yearMenuOpen = this.state.yearMenuOpen === ' open' ? '' : ' open';
        this.setState(() => ({ yearMenuOpen }));
    }
    closeYearSelectMenu = () => {
        const yearMenuOpen = '';
        this.setState(() => ({ yearMenuOpen }));
    }
    getYearRange = (yearNum) => {
        this.state.yearNum = yearNum;
    }
    getYears = () => {
        const years = [];
        const yearNum = this.state.yearNum;

        for(let i = yearNum - 4; i <= yearNum + 4; i++) {
            years.push(i);
        };

        return years;
    }
    setPrevYear = () => {
        const yearNum = this.state.yearNum - 9;
        this.state.viewYear.setYear(yearNum);
        this.setState(() => ({ yearNum }));
    }
    setNextYear = () => {
        const yearNum = this.state.yearNum + 9;
        this.state.viewYear.setYear(yearNum);
        this.setState(() => ({ yearNum }));
    }
    selectYear = (e) => {
        const year = parseInt(e.target.attributes.year.value);
        const currentDate = this.state.currentDate;
        currentDate.setYear(year);
        this.setState(() => ({ currentDate }));
        this.closeYearSelectMenu();
    }
    render() {
        this.getYearRange(this.state.viewYear.getFullYear());
        return (
            <div className="year-selector__wrapper">
                <div className="year-selector__selected" onClick={this.toggleYearSelectMenu}>
                    <span className="year-selector__title">{this.state.currentDate.getFullYear()}</span>
                    <ExpandMore className="material-icons" />
                </div>
                <div className={'year-selector__selector' + this.state.yearMenuOpen}>
                    <div className="year-selector__nav">
                        <button className="year-selector__prev" onClick={this.setPrevYear}>
                            <NavigateBefore className="material-icons" />
                        </button>
                        <div className="year-selector__range">
                            {`
                                ${this.state.yearNum - 4}
                                -
                                ${this.state.yearNum + 4}
                            `}
                        </div>
                        <button className="year-selector__next" onClick={this.setNextYear}>
                            <NavigateNext className="material-icons" />
                        </button>
                    </div>
                    <div className="year-selector__select">
                        {
                            this.getYears().map((year) => {
                                return (
                                    <div
                                        className={year === this.state.currentDate.getFullYear() ? 'selected' : ''}
                                        onClick={this.selectYear}
                                        year={year}
                                        key={year}
                                    >
                                        {year}
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}