import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Upload from './pages/Upload';
import Payment from './pages/Payment';
import CustomSignUp from './pages/CustomSignup';
import CustomLogin from './pages/CustomLogin';
import Register from './pages/Register';

import ConfirmSignUp from './pages/ConfirmSignUp';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
        

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/signup" element={<CustomSignUp />} />
          <Route path="/login" element={<CustomLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm" element={<ConfirmSignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
