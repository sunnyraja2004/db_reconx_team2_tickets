<<<<<<< HEAD
// withAuth HOC: redirects to /login if no JWT.
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
=======
// TICKET-ADV112 — withAuth HOC: redirects to /login if no JWT.
import React from 'react';
import { Navigate } from 'react-router-dom';
>>>>>>> c2757038 (daywise-files)
import { useAuth } from '@context/AuthContext.jsx';

export function withAuth(Component) {
  function WithAuth(props) {
<<<<<<< HEAD
    const { user } = useAuth();
    const location = useLocation();
    if (!user) {
      return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }
=======
    // TODO(TICKET-ADV112): read `user` from useAuth(); if falsy, return
    //                     <Navigate to="/login" replace />, otherwise render
    //                     the wrapped <Component {...props} />.
>>>>>>> c2757038 (daywise-files)
    return <Component {...props} />;
  }
  WithAuth.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;
  return WithAuth;
}
