import React from 'react';
import { shallow } from 'enzyme';
import ColorPicker from '../../components/ColorPicker';

test('should render ColorPicker correctly', () => {
    const wrapper = shallow(<ColorPicker />);
    expect(wrapper).toMatchSnapshot();
});
