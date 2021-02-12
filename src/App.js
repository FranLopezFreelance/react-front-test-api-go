import React, { useState, useEffect } from 'react'; 
import Auth from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './utils/contexts';
import { isUserLoggedIn } from './utils/functions';
import Routing from './routes/Routing';

export default function App() {

  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    setUser(isUserLoggedIn());
    setLoginState(false);
    setLoadUser(true);
  }, [loginState]);

  if (!loadUser) return null; 

  return (
    <AuthContext.Provider value={user}>
      { 
        !user ? 
          <Auth setLoginState={setLoginState} /> : 
          <Routing />
      }
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  )
}
