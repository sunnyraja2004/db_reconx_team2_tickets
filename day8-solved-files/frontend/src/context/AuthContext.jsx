<<<<<<< HEAD
<<<<<<< HEAD
// AuthContext used by withAuth HOC; JWT persisted in sessionStorage.
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

function readInitialUser() {
  if (typeof sessionStorage === 'undefined') return null;
  const token = sessionStorage.getItem('reconx-token');
  const role  = sessionStorage.getItem('reconx-role');
  return token ? { token, role } : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readInitialUser);

  const login = (token, role) => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('reconx-token', token);
      if (role) sessionStorage.setItem('reconx-role', role);
    }
    setUser({ token, role });
  };

  const logout = () => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('reconx-token');
      sessionStorage.removeItem('reconx-role');
    }
    setUser(null);
=======
// TICKET-ADV112 — AuthContext used by withAuth HOC; JWT persisted in memory
// (refresh path lives in HttpOnly cookie — out of scope for this trainer copy).
=======
// AuthContext used by withAuth HOC; JWT persisted in sessionStorage.
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

function readInitialUser() {
  if (typeof sessionStorage === 'undefined') return null;
  const token = sessionStorage.getItem('reconx-token');
  const role  = sessionStorage.getItem('reconx-role');
  return token ? { token, role } : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readInitialUser);

  const login = (token, role) => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('reconx-token', token);
      if (role) sessionStorage.setItem('reconx-role', role);
    }
    setUser({ token, role });
  };

  const logout = () => {
<<<<<<< HEAD
    // TODO(TICKET-ADV112): clear sessionStorage and reset user state to null.
>>>>>>> c2757038 (daywise-files)
=======
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('reconx-token');
      sessionStorage.removeItem('reconx-role');
    }
    setUser(null);
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
