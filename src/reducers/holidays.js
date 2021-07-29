const holidaysReducerDefaultState = [];

const holidaysReducer = (state = holidaysReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_HOLIDAY':
            return [
                ...state,
                action.holiday
            ];
        case 'REMOVE_HOLIDAY':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_HOLIDAY':
            return state.map((holiday) => {
                if (holiday.id === action.id) {
                    return {
                        ...holiday,
                        ...action.updates
                    };
                } else {
                    return holiday;
                }
            });
        case 'POPULATE_EVENTS':
            return action.holidays
        default:
            return state;
    };
};

export { holidaysReducer as default };