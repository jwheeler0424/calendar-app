import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { CalendarDay } from '../../components/CalendarDay';

let setActiveDaily, setCurrentDate, wrapper;

beforeEach(() => {
    setActiveDaily = jest.fn();
    setCurrentDate = jest.fn();
    wrapper = shallow(<CalendarDay 
        setActiveDaily={setActiveDaily}
        setCurrentDate={setCurrentDate}
        date={moment()}
        type="current"
    />);
});

test('should render CalendarDay correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should set active calendar to daily and calendar date', () => {
    wrapper.simulate('click',  {"target":{"parentElement":{"attributes": {"date": moment()}}}});
    expect(setActiveDaily).toHaveBeenCalled();
    expect(setCurrentDate).toHaveBeenCalled();
});