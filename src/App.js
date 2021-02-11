import React, { useState } from 'react'; 
import Auth from './pages/Auth';
import { ToastContainer } from 'react-toastify';

export default function App() {

  const [user, setUser] = useState(null);

  setUser(null);

  return (
    <div>
      {!user ? (
        <div>
          <Auth />
        </div>
      ) : (
        <h3>No estás logueado</h3>
      )}
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
    </div>
  )
}
