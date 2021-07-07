import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar';
import 'normalize.css/normalize.css';
import './styles/styles.scss'

const jsx = (
    <Calendar />
)

ReactDOM.render(jsx, document.getElementById('app'))