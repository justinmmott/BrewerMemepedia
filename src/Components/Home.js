import React from 'react';
import {
    BrowserRouter as Router,
    // Switch,
    // Route,
    Link
} from "react-router-dom";

import MainPage from './MainPage';
import './../css/home.css'

const Home = () => {
    return (
        <div className="homePage">
            <Router>
                <nav className="navbar">
                    <ul className="navbar-nav">
                        <li className="logo">
                            <Link to="/" className="nav-link">
                                <div className="fas fa-angle-double-left icon"></div>
                                <span className="link-text">Memepedia</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/inject" className="nav-link">
                                <div className="fas fa-syringe icon"></div>
                                <span className="link-text">Inject</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/eject" className="nav-link">
                                <div className="fas fa-eject icon"></div>
                                <span className="link-text">Eject</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/eject" className="nav-link">
                                <div className="fas fa-moon icon"></div>
                                <span className="link-text">Dark Mode</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <main>
                    <MainPage />
                </main>
            </Router>
        </div>
    );
}

export default Home;