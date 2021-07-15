import moment from 'moment';

// title: '',
// startTime: moment().startOf('hour'),
// endTime: moment().endOf('hour'),
// allDay: false,
// color: 'peacock',
// location: '',
// notes: ''

const eventsReducerDefaultState = [];

const expensesReducer = (state = eventsReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    };
};

export default expensesReducer;