const eventsReducerDefaultState = [];

const eventsReducer = (state = eventsReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EVENT':
            return [
                ...state,
                action.event
            ];
        case 'REMOVE_EVENT':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EVENT':
            return state.map((event) => {
                if (event.id === action.id) {
                    return {
                        ...event,
                        ...action.updates
                    };
                } else {
                    return event;
                }
            });
        case 'POPULATE_EVENTS':
            return action.events
        default:
            return state;
    }
}

export { eventsReducer as default };