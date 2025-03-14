import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">Serverless App</Link>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/notes">Notes</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li> {/* ← Add this line */}
        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
        
        <li className="nav-item"><Link className="nav-link" to="/payment">Payment</Link></li>

      </ul>
    </nav>
  );
}
