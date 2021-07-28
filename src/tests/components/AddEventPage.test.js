import React from 'react';
import { shallow } from 'enzyme';
import AddEventPage from '../../components/AddEventPage';

test('should render AddEventPage correctly', () => {
    const wrapper = shallow(<AddEventPage />)
    expect(wrapper).toMatchSnapshot();
});