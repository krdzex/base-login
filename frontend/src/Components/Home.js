import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="homePage">
            <h2>Welcome to our base login app.</h2>
            <div className="homepageButtons">
                <Link to="/login"><button id="login">Login</button></Link>
                <Link to="/registar"><button id="registar">Registar</button></Link>
            </div>

        </div>
    );
};

export default Home;
