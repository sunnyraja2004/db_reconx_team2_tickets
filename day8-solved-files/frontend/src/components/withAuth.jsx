<<<<<<< HEAD
<<<<<<< HEAD
// withAuth HOC: redirects to /login if no JWT.
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
=======
// TICKET-ADV112 — withAuth HOC: redirects to /login if no JWT.
import React from 'react';
import { Navigate } from 'react-router-dom';
>>>>>>> c2757038 (daywise-files)
=======
// withAuth HOC: redirects to /login if no JWT.
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
import { useAuth } from '@context/AuthContext.jsx';

export function withAuth(Component) {
  function WithAuth(props) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
    const { user } = useAuth();
    const location = useLocation();
    if (!user) {
      return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }
<<<<<<< HEAD
=======
    // TODO(TICKET-ADV112): read `user` from useAuth(); if falsy, return
    //                     <Navigate to="/login" replace />, otherwise render
    //                     the wrapped <Component {...props} />.
>>>>>>> c2757038 (daywise-files)
=======
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
    return <Component {...props} />;
  }
  WithAuth.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;
  return WithAuth;
}
