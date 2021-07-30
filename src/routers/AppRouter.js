import React, { useHistory } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import CalendarDashboardPage from '../components/CalendarDashboard';
import LoginPage from '../components/LoginPage'
// import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {
    const history = useHistory();
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

export { AppRouter as default };