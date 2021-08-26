import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import EventForm from '../../components/EventForm';
import getRoundedMinute from '../../utils/getRoundedMinute';
import events from '../fixtures/events';
import colors from '../fixtures/colors';

test('should render EventForm correctly', () => {
    const wrapper = shallow(<EventForm event={events[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render EventForm with expense data correctly', () => {
    const wrapper = shallow(<EventForm event={events[1]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const onSetMessagesSpy = jest.fn();
    const wrapper = shallow(<EventForm onSetMessages={onSetMessagesSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(onSetMessagesSpy).toHaveBeenLastCalledWith([
        "Please enter a title for the event.",
        "Please select a date for the event to start.",
    ]);
})

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const onSetMessagesSpy = jest.fn();
    const wrapper = shallow(<EventForm event={events[1]} onSubmit={onSubmitSpy} onSetMessages={onSetMessagesSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(onSetMessagesSpy).toBeCalledTimes(0);
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        title: events[1].title,
        startDate: events[1].startDate,
        endDate: events[1].endDate,
        color: events[1].color,
        duration: events[1].duration,
        location: events[1].location,
        notes: events[1].notes
    });
});

test('should set title on input change', () => {
    const value = 'Dinner';
    const wrapper = shallow(<EventForm />);
    wrapper.find('input').at(0).prop('onChange')({
        target: { value }
    });
    
    expect(wrapper.find('input').at(0).prop('value')).toBe(value);
})

test('should set new startDate on time change', () => {
    const now = moment().minute(getRoundedMinute()).startOf('minute').valueOf();
    const wrapper = shallow(<EventForm />);
    wrapper.find('TimePicker').at(0).prop('onChange')(now);
    expect(wrapper.find('TimePicker').at(0).prop('value')).toStrictEqual(moment(now));
});

test('should set new startDate on date change', () => {
    const now = moment().minute(getRoundedMinute()).startOf('minute').valueOf();
    const wrapper = shallow(<EventForm />);
    wrapper.find('Picker').at(0).prop('onChange')(now);
    expect(wrapper.find('Picker').at(0).prop('value')).toStrictEqual(moment(now));
});

test('should set new endDate on time change', () => {
    const now = moment().minute(getRoundedMinute()).startOf('minute').add(1, 'hour').valueOf();
    const wrapper = shallow(<EventForm />);
    wrapper.find('TimePicker').at(1).prop('onChange')(now);
    expect(wrapper.find('TimePicker').at(1).prop('value')).toStrictEqual(moment(now));
});

test('should set new endDate on date change', () => {
    const now = moment().minute(getRoundedMinute()).startOf('minute').add(1, 'hour').valueOf();
    const wrapper = shallow(<EventForm />);
    wrapper.find('Picker').at(1).prop('onChange')(now);
    expect(wrapper.find('Picker').at(1).prop('value')).toStrictEqual(moment(now));
});

test('should set new color on color change', () => {
    const color = colors[2];
    const wrapper = shallow(<EventForm />);
    wrapper.find('ColorPicker').prop('onColorChange')(color.title);
    expect(wrapper.find('ColorPicker').prop('color')).toBe(color.title);
});

test('should set day duration on change', () => {
    const value = 'day';
    const wrapper = shallow(<EventForm />);
    expect(wrapper.find({id: 'event-duration-hourly'}).prop('checked')).toBeTruthy();
    expect(wrapper.find({id: 'event-duration-daily'}).prop('checked')).toBeFalsy();
    wrapper.find({id: 'event-duration-hourly'}).prop('onChange')({
        target: { value }
    })
    expect(wrapper.find({id: 'event-duration-hourly'}).prop('checked')).toBeFalsy();
    expect(wrapper.find({id: 'event-duration-daily'}).prop('checked')).toBeTruthy();
});

test('should set location on change', () => {
    const location = { 
        description: 'Home',
        address: '',
        placeId: '',
        coordinates: {
            lat: '',
            lng: ''
        }
    }
    const wrapper = shallow(<EventForm />);
    wrapper.find('LocationInput').prop('onLocationChange')(location);
    expect(wrapper.find('LocationInput').prop('location')).toEqual(location);
});

test('should set note on textarea change', () => {
    const value = 'New note';
    const wrapper = shallow(<EventForm />);
    wrapper.find('textarea').at(0).prop('onChange')({
        target: { value }
    });
    
    expect(wrapper.find('textarea').at(0).prop('value')).toBe(value);
});