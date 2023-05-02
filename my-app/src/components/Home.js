import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

function Home() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h2>Welcome to the Admin page!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
