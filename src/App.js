import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import CalendarMonthly from './components/CalendarMonthly';
import Header from './components/Header';
import 'normalize.css/normalize.css';
import './styles/styles.scss'

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <Header />
        <CalendarMonthly />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))