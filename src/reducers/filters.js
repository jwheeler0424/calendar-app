import moment from 'moment';

const filtersReducerDefaultState = {
    text: '',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    };
};

export { filtersReducer as default };