import React, { useState } from 'react';

import { auth, googleSignIn } from './../firebase/firebase';
import './../css/loginpage.css';

const LoginPage = () => {
    const [signUp, setSignUp] = useState(false);

    return (
        <div className="login-page">
            {signUp ?
                <SignupForm />
                :
                <LoginForm signUp={setSignUp}/>}
        </div>
    );
};

const LoginForm = (props) => {
    return (
        <form className="login-form">
            <h1>Login</h1>
            <div className="login-input" >
                <input type="text" />
            </div>
            <div className="login-input" >
                <input type="password" />
            </div>
            <input type="submit" className="login-submit" value="Login" />
            <div className="signup" onClick={() => props.signUp(true)}>
                <div className="create-account">
                    Sign up
                </div>
            </div>
            <div className="google-sign-in" onClick={() => auth.signInWithRedirect(googleSignIn)} />
        </form>
    );
}

const SignupForm = () => {
    return (
        <form className="login-form">
            <h1>Sign Up</h1>
            <div className="login-input" >
                <input type="text" />
            </div>
            <div className="login-input" >
                <input type="text" />
            </div>
            <div className="login-input" >
                <input type="password" />
            </div>
            <input type="submit" className="login-submit" value="Create Account" />
        </form>
    );
}

export default LoginPage;