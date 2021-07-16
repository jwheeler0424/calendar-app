import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigateBefore, NavigateNext, ExpandMore } from '@material-ui/icons';
import { setCurrentDate } from '../actions/views';

export class YearSelector extends React.Component { 
    constructor(props) {
        super(props);
        
        this.state = {
            yearMenuOpen: '',
            viewYear: moment(props.views.currentDate)
        };
    }
    toggleYearSelectMenu = () => {
        const yearMenuOpen = this.state.yearMenuOpen === ' open' ? '' : ' open';
        this.setState(() => ({ yearMenuOpen }));
    }
    closeYearSelectMenu = () => {
        const yearMenuOpen = '';
        this.setState(() => ({ yearMenuOpen }));
    }
    getYears = () => {
        const years = [];
        const yearNum = this.state.viewYear.year();

        for(let i = yearNum - 4; i <= yearNum + 4; i++) {
            years.push(i);
        };

        return years;
    }
    setPrevYear = () => {
        const yearNum = this.state.viewYear.year() - 9;
        const viewYear = this.state.viewYear.year(yearNum);
        this.setState(() => ({ viewYear }));
    }
    setNextYear = () => {
        const yearNum = this.state.viewYear.year() + 9;
        const viewYear = this.state.viewYear.year(yearNum);
        this.setState(() => ({ viewYear }));
    }
    selectYear = (e) => {
        const year = parseInt(e.target.attributes.year.value);
        const currentDate = moment(this.props.views.currentDate).year(year);
        this.props.setCurrentDate(currentDate.valueOf());
        this.closeYearSelectMenu();
    }
    render() {
        return (
            <div className="year-selector__wrapper">
                <div className="year-selector__selected" onClick={this.toggleYearSelectMenu}>
                    <span className="year-selector__title">{moment(this.props.views.currentDate).year()}</span>
                    <ExpandMore className="material-icons" />
                </div>
                <div className={'year-selector__selector' + this.state.yearMenuOpen}>
                    <div className="year-selector__nav">
                        <button className="year-selector__prev" onClick={this.setPrevYear}>
                            <NavigateBefore className="material-icons" />
                        </button>
                        <div className="year-selector__range">
                            {`
                                ${this.state.viewYear.year() - 4}
                                -
                                ${this.state.viewYear.year() + 4}
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
                                        className={year === moment(this.props.views.currentDate).year() ? 'selected' : ''}
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

const mapStateToProps = (state) => ({
    views: state.views
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentDate: (currentDate) => dispatch(setCurrentDate(currentDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(YearSelector);