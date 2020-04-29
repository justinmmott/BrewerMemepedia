import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from 'react-loader-spinner';

import Home from './Home';
import LoginPage from './LoginPage';
import { auth } from './../firebase/firebase';

const App = () => {
  const [user, initialising] = useAuthState(auth);
  
  return (
    initialising ?
      <div className="loader-wrapper">
        <Loader type="Oval" color="#69abed" className="loader" />
      </div>
      :
      user ?
        user.emailVerified ? 
          <Home /> 
          :
          <div>Please Verify Email</div>
        :
        <LoginPage />
  );
}

export default App;
