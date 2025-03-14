// src/pages/ConfirmSignUp.js
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

export default function ConfirmSignUp() {
  const [formData, setFormData] = useState({
    username: '',
    code: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { username, code } = formData;
      await Auth.confirmSignUp(username, code);
      setMessage('✅ Confirmation successful! You can now log in.');
    } catch (err) {
      console.error('Confirmation error:', err);
      setMessage(`❌ ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Confirm Sign Up</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Username</label>
          <input type="text" className="form-control" name="username" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Confirmation Code</label>
          <input type="text" className="form-control" name="code" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Confirming...' : 'Confirm Sign Up'}
        </button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}
