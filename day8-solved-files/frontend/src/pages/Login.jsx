<<<<<<< HEAD
<<<<<<< HEAD
// Login page exchanging email/password for a JWT.
=======
// TICKET-ADV072 — Login page exchanging email/password for a JWT.
>>>>>>> c2757038 (daywise-files)
=======
// Login page exchanging email/password for a JWT.
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext.jsx';
import { api } from '@services/apiService.js';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@db.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
    setError(null);
    try {
      const { token, role } = await api.login(email, password);
      login(token, role);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
<<<<<<< HEAD
=======
    // TODO(TICKET-ADV072):
    //   1. call api.login(email, password) — it returns { token, role }.
    //   2. on success: call login(token, role) from AuthContext, then
    //      navigate('/').
    //   3. on failure: setError(err.message) so the alert div renders.
>>>>>>> c2757038 (daywise-files)
=======
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
  }

  return (
    <form onSubmit={submit} className="login-form">
      <h2>Sign in</h2>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      </label>
      <label>
        Password
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
      </label>
      {error && <div role="alert" className="form-error">{error}</div>}
      <button type="submit">Sign in</button>
    </form>
  );
}
