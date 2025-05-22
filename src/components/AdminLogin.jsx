// src/components/AdminLogin.jsx
import React, { useState } from 'react';
import '../Styles/admin-login.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const BASE_URL = 'https://natthu-backend.onrender.com';
    try {
      const res = await fetch(BASE_URL+'/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('adminToken', data.token);
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleSubmit} className="admin-login-form">
        <h2>Admin Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
