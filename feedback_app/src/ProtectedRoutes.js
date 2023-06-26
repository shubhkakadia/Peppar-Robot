import React from "react";
import { Navigate } from 'react-router-dom';
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function ProtectedRoutes({ children }) {
    // Check if the token exists
    const token = cookies.get("TOKEN");
    
    // If the token exists, render the protected children components,
    // otherwise, navigate to the login page
    return token ? children : <Navigate to="/login" replace />;
}
