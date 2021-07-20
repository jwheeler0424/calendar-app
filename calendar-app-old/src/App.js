import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetEvents } from './actions/events';
import { login, logout } from './actions/auth';
import { setTodayDate } from './actions/views'
import 'normalize.css/normalize.css';
import './styles/styles.scss'
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(setTodayDate());
        store.dispatch(startSetEvents()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/calendar')
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});