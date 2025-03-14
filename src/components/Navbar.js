import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => setUser(null));
  }, []);

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      setUser(null);
      navigate('/login'); // redirect to login page
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">Serverless App</Link>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/notes">Notes</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/payment">Payment</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/confirm">Confirm Signup</Link></li>


      </ul>
      <ul className="navbar-nav ms-auto">
        {user ? (
          <>
            <li className="nav-item">
              <span className="nav-link">Hi, {user.username}</span>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger btn-sm" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
