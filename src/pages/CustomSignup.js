// src/pages/CustomSignUp.js
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export default function CustomSignUp() {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await Auth.signUp({
        username: form.username,
        password: form.password,
        attributes: {
          email: form.email,
        },
      });
      setMessage('Sign up successful. Please check your email for confirmation.');
      navigate('/login'); // or go to confirm page if you want manual code confirmation
    } catch (error) {
      console.error('Signup error:', error);
      setMessage(error.message || 'Error signing up');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="form-control mb-2"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-2"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      {message && <p className="mt-3 alert alert-info">{message}</p>}
    </div>
  );
}
