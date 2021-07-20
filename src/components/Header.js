import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MoreTime } from '../svg/Icons';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>Calendar App</h1>
                </Link>
                <button className="button button--link" onClick={startLogout}>Logout</button>
                <Link to="/create">
                    <MoreTime />
                </Link>
            </div>
        </div>
    </header>
)

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);