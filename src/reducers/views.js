import moment from 'moment';

const viewsReducerDefaultState = {
    activeCalendar: 'monthly',
    currentDate: moment().startOf('day'),
    todayDate: moment().startOf('day')
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
            return {
                ...state,
                currentDate: action.currentDate
            }
        case 'SET_TODAY_DATE':
            return {
                ...state,
                todayDate: moment().startOf('day')
            };
        default:
            return state;
    };
};

export default viewsReducer;