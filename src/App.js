import React from 'react';
import ReactDOM from 'react-dom';
import CalendarMonthly from './components/CalendarMonthly';
import Header from './components/Header';
import 'normalize.css/normalize.css';
import './styles/styles.scss'

const jsx = (
    <div>
        <Header />
        <CalendarMonthly />
    </div>
)

ReactDOM.render(jsx, document.getElementById('app'))