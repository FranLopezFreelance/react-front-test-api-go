import React, { useState, useEffect } from 'react';
import Auth from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './utils/contexts';
import { isUserLoggedIn } from './utils/functions';
import Routing from './routes/Routing';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(isUserLoggedIn());
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!user ? <Auth /> : <Routing />}
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
  );
}
