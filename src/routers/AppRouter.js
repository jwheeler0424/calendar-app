import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AddEventPage from '../components/AddEventPage';
import EditEventPage from '../components/EditEventPage';
import CalendarPage from '../components/CalendarPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/calendar" component={CalendarPage} />
                <PrivateRoute path="/create" component={AddEventPage} />
                <PrivateRoute path="/edit/:id" component={EditEventPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;