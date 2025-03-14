// src/pages/CustomLogin.js
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export default function CustomLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.signIn(form.username, form.password);
      console.log('Signed in user:', user);
      setMessage('Login successful');
      navigate('/dashboard'); // redirect on success
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.message || 'Error signing in');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="form-control mb-2"
          value={form.username}
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
        <button type="submit" className="btn btn-success">Login</button>
      </form>
      {message && <p className="mt-3 alert alert-info">{message}</p>}
    </div>
  );
}
