import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import eventsReducer from '../reducers/events';
import filtersReducer from '../reducers/filters';
import holidaysReducer from '../reducers/holidays';
import viewsReducer from '../reducers/views';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

export default () => {
    const store = createStore(
        combineReducers({
            events: eventsReducer,
            filters: filtersReducer,
            holidays: holidaysReducer,
            views: viewsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}