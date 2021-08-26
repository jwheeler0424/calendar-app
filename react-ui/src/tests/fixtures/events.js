import moment from 'moment';

const events = [{
    id: '0',
    title: '',
    startDate: moment().valueOf(),
    endDate: moment().add(1, 'hour').valueOf(),
    duration: 'time',
    color: 'peacock',
    location: { 
        description: '',
        address: '',
        placeId: '',
        coordinates: {
            lat: '',
            lng: ''
        }
    },
    notes: ''
}, {
    id: '1',
    title: 'Meeting',
    startDate: moment().add(52, 'years').valueOf(),
    endDate: moment().add(52, 'years').add(1, 'hours').valueOf(),
    duration: 'time',
    color: 'peacock',
    location: { 
        description: '',
        address: '',
        placeId: '',
        coordinates: {
            lat: '',
            lng: ''
        }
    },
    notes: ''
}, {
    id: '2',
    title: 'Drive',
    startDate: moment().add(50, 'years').valueOf(),
    endDate: moment().add(50, 'years').add(1, 'hours').valueOf(),
    duration: 'day',
    color: 'basil',
    location: { 
        description: '',
        address: '',
        placeId: '',
        coordinates: {
            lat: '',
            lng: ''
        }
    },
    notes: ''
}, {
    id: '3',
    title: 'Eat',
    startDate: moment().add(51, 'years').valueOf(),
    endDate: moment().add(51, 'years').add(1, 'hours').valueOf(),
    duration: 'time',
    color: 'flamingo',
    location: { 
        description: '',
        address: '',
        placeId: '',
        coordinates: {
            lat: '',
            lng: ''
        }
    },
    notes: ''
}];

export { events as default};