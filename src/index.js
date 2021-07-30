import React, { useHistory } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';
import reportWebVitals from './reportWebVitals';
import LoadingPage from './components/LoadingPage';
import 'react-dates/initialize';
import './styles/styles.scss';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <React.StrictMode>{jsx}</React.StrictMode>, 
      document.getElementById('root')
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <LoadingPage />
  </React.StrictMode>,
  document.getElementById('root')
);

firebase.auth().onAuthStateChanged((user) => {
  const history = useHistory();
  if (user) {
    store.dispatch(login(user.uid));
    renderApp();
    if(history.location.pathname === '/') {
      history.push('/calendar');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
