import React from 'react';
import { useRoutes, A } from 'hookrouter';

import './../css/home.css'
import { signOut } from './../firebase/firebase';
import routes from './../routes';


const Home = () => {
    const routeResult = useRoutes(routes);

    return (
        <div className="homePage">
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="logo">
                        <A href="/" className="nav-link">
                            <div className="fas fa-angle-double-left icon" ></div>
                            <span className="link-text">Memepedia</span>
                        </A>
                    </li>
                    <li className="nav-item">
                        <A href="/" className="nav-link" onClick={() => window.document.getElementById("search-bar").focus()}>
                            <div className="fas fa-search icon"></div>
                            <span className="link-text">Search</span>
                        </A>
                    </li>
                    <li className="nav-item">
                        <A href="/addMeme" className="nav-link">
                            <div className="fas fa-plus icon"></div>
                            <span className="link-text">Add</span>
                        </A>
                    </li>
                    <li className="nav-item">
                        <A href="/random" className="nav-link">
                            <div className="fas fa-random icon"></div>
                            <span className="link-text">Random</span>
                        </A>
                    </li>
                    {/* <li className="nav-item">
                        <A href="/eject" className="nav-link">
                            <div className="fas fa-moon icon"></div>
                            <span className="link-text">Dark Mode</span>
                        </A>
                    </li> */}
                    <li className="nav-item">
                        <A href="/" className="nav-link" onClick={signOut}>
                            <div className="fas fa-sign-out-alt icon"></div>
                            <span className="link-text">Logout</span>
                        </A>
                    </li>
                </ul>
            </nav>
            <main>
                {routeResult}
            </main>      
        </div>
    );
}

export default Home;

