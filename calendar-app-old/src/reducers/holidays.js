import moment from 'moment';

const holidaysReducerDefaultState = [];

const holidaysReducer = (state = holidaysReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    };
};

export default holidaysReducer;