import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const{userAuth,loading}=useContext(AuthContext);
    if(loading) return <h2>Loading...</h2>
    if(!userAuth) <Navigate to="/log-in"/>
  return (
    <>
      {children}
    </>
  )
}
