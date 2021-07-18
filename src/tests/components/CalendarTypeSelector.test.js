import React from 'react';
import { shallow } from 'enzyme';
import { CalendarTypeSelector } from '../../components/CalendarTypeSelector';

test('should render CalendarTypeSelector corrently', () => {
    const wrapper = shallow(<CalendarTypeSelector />);
    expect(wrapper).toMatchSnapshot();
});

test('should set activeCalendar to daily', () => {
    const wrapper = shallow(<CalendarTypeSelector />);
    wrapper.find('button').at(0).simulate('click');
    
});