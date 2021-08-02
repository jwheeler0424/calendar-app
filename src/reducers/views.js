import moment from 'moment';

const viewsReducerDefaultState = {
    activeCalendar: 'monthly',
    activeView: 'list',
    activeEvent: undefined,
    lastView: '',
    currentDate: 0
};

const viewsReducer = (state = viewsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_CALENDAR':
            const activeCalendar = action.activeCalendar;
            return {
                ...state,
                activeCalendar
            };
        case 'SET_ACTIVE_VIEW':
            const activeView = action.activeView;
            return {
                ...state,
                activeView
            };
        case 'SET_ACTIVE_EVENT':
            const activeEvent = action.activeEvent;
            return {
                ...state,
                activeEvent
            };
        case 'SET_LAST_VIEW':
            const lastView = action.lastView;
            return {
                ...state,
                lastView
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

export { viewsReducer as default };