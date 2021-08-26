import React from 'react';
import { Header } from './Header';
import Footer from './Footer';
import loader from '../images/loading.gif'

const LoadingPage = () => {
    return (
        <div className="loading-page__wrapper">
            <Header />
            <div className="loader">
                <img className="loader__image" src={loader} alt="loading" />
            </div>
            <Footer />
        </div>
    );
}

export default LoadingPage;