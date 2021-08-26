import React from 'react';
import { shallow } from 'enzyme';
import LocationInput from '../../components/LocationInput';

test('should render LocationInput correctly', () => {
    const wrapper = shallow(<LocationInput />);
    expect(wrapper).toMatchSnapshot();
});

test('should set location on change', () => {
    const value = 'Home';
    const wrapper = shallow(<LocationInput />);
    wrapper.find('input').at(0).prop('onChange')({
        target: { value }
    });
    expect(wrapper.find('input').at(0).prop('value')).toBe(value);
})