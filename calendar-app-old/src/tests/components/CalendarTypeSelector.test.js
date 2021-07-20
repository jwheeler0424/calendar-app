import React from 'react';
import { shallow } from 'enzyme';
import { CalendarTypeSelector } from '../../components/CalendarTypeSelector';

let setActiveDaily, setActiveWeekly, setActiveMonthly, setActiveYearly, wrapper;
beforeEach(() => {
    setActiveDaily = jest.fn();
    setActiveWeekly = jest.fn();
    setActiveMonthly = jest.fn();
    setActiveYearly = jest.fn();
    wrapper = shallow(<CalendarTypeSelector 
        views={{activeCalendar: 'monthly'}}
        setActiveDaily={setActiveDaily}
        setActiveWeekly={setActiveWeekly}
        setActiveMonthly={setActiveMonthly}
        setActiveYearly={setActiveYearly}
     />);
});

test('should render CalendarTypeSelector correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should set activeCalendar to daily', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(setActiveDaily).toHaveBeenCalled();
});

test('should set activeCalendar to weekly', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(setActiveWeekly).toHaveBeenCalled();
});

test('should set activeCalendar to monthly', () => {
    wrapper.find('button').at(2).simulate('click');
    expect(setActiveMonthly).toHaveBeenCalled();
});

test('should set activeCalendar to yearly', () => {
    wrapper.find('button').at(3).simulate('click');
    expect(setActiveYearly).toHaveBeenCalled();
});