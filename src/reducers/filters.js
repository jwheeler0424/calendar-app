import moment from 'moment';

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day')
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate.startOf('day')
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate.endOf('day')
            }
        default:
            return state;
    };
};

export { filtersReducer as default };