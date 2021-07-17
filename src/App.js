import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import CalendarView from './components/CalendarView';
import Header from './components/Header';
import 'normalize.css/normalize.css';
import './styles/styles.scss'

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <Header />
        <CalendarView />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))