import moment from 'moment';

const viewsReducerDefaultState = {
    activeCalendar: 'monthly',
    currentDate: 0
};

const viewsReducer = (state = viewsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_DAILY':
            return {
                ...state,
                activeCalendar: 'daily'
            };
        case 'SET_ACTIVE_WEEKLY':
            return {
                ...state,
                activeCalendar: 'weekly'
            };
        case 'SET_ACTIVE_MONTHLY':
            return {
                ...state,
                activeCalendar: 'monthly'
            };
        case 'SET_ACTIVE_YEARLY':
            return {
                ...state,
                activeCalendar: 'yearly'
            }
        case 'SET_CURRENT_DATE':
            const currentDate = action.currentDate;
            return {
                ...state,
                currentDate
            }
        case 'SET_TODAY_DATE':
            return {
                ...state,
                currentDate: moment().startOf('day')
            };
        default:
            return state;
    };
};

export default viewsReducer;