import React, { useState, useEffect } from 'react';

import { auth, googleSignIn, signUpWithEmailPassword, sendEmailVerification, signInWithEmailPassword } from './../firebase/firebase';
import './../css/loginpage.css';

const LoginPage = () => {
    const [signUp, setSignUp] = useState(false);

    return (
        <div className="login-page">
            {signUp ?
                <SignupForm signUp={setSignUp} />
                :
                <LoginForm signUp={setSignUp}/>}
        </div>
    );
};

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    
        signInWithEmailPassword(email, password);
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="login-input" >
                <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} required/>
            </div>
            <div className="login-input" >
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
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



const SignupForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        window.history.pushState('', '', 'signup');

        window.onpopstate = () => {
            props.signUp('');
        };
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if(password !== confirmPassword) {
            alert('passwords do not match');
            return
        }
    
        await signUpWithEmailPassword(email, password);
        sendEmailVerification();
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="login-input" >
                <input type="text" value={email} placeholder="Email" onChange={(event) => setEmail(event.target.value)} required/>
            </div>
            <div className="login-input" >
                <input type="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)} required/>
            </div>
            <div className="login-input" >
                <input type="password" value={confirmPassword} placeholder="Confrim Password" onChange={(event) => setConfirmPassword(event.target.value)} required/>
            </div>
            <input type="submit" className="login-submit" value="Create Account" />
        </form>
    );
}

export default LoginPage;