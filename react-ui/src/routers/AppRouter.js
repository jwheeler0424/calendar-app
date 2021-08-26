import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import CalendarDashboardPage from '../components/CalendarDashboardPage';
import LoginPage from '../components/LoginPage'
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const history = createBrowserHistory();

const AppRouter = () => {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <PublicRoute path="/" component={LoginPage} exact={true} />
                    <PrivateRoute patch="/calendar" component={CalendarDashboardPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </Router>
    );
}

export { history, AppRouter as default };