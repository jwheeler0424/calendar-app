import React from 'react';
import { shallow } from 'enzyme';
import EventFormModal from '../../components/EventFormModal';

const messages = ['Please enter a title for the event.']

test('should render EventFormModal correctly', () => {
    const wrapper = shallow(<EventFormModal messages={messages} />);
    expect(wrapper).toMatchSnapshot();
});

test('should close on button click', () => {
    const handleClearMessages = jest.fn();
    const wrapper = shallow(<EventFormModal  messages={messages} handleClearMessages={handleClearMessages} />);
    wrapper.find('button').simulate('click'); 
    expect(handleClearMessages).toHaveBeenCalled();
})