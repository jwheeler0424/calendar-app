import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout, uid }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                {uid ? (<>
                    <Link className="header__title" to="/calendar">
                        <h1>dusk</h1>
                    </Link>
                    <button className="button button--link" onClick={startLogout}>Logout</button>
                </>) : <h1>dusk</h1>}
            </div>
        </div>
    </header>
)

const mapStateToProps = (state) => ({
    uid: state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);