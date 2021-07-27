import moment from 'moment';

const events = [{
    id: '1',
    title: 'Meeting',
    startDate: moment().subtract(4, 'days').valueOf(),
    endDate: moment().subtract(4, 'days').add(1, 'hours').valueOf(),
    duration: 'time',
    color: 'peacock',
    location: {},
    notes: ''
}, {
    id: '2',
    title: 'Drive',
    startDate: moment().add(4, 'days').valueOf(),
    endDate: moment().add(5, 'days').valueOf(),
    duration: 'day',
    color: 'basil',
    location: {},
    notes: ''
}, {
    id: '3',
    title: 'Eat',
    startDate: moment().valueOf(),
    endDate: moment().add(1, 'hours').valueOf(),
    duration: 'time',
    color: 'flamingo',
    location: {},
    notes: ''
}];

export { events as default};