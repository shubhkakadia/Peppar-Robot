import Cookies from "universal-cookie";

// Create an instance of the universal-cookie library
const cookies = new Cookies();

// Action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action creator for login
export const login = (username, password) => {
  // Check if the provided username and password are correct
  if (username === 'admin' && password === 'admin') {
    // Set a cookie named "TOKEN" with the value "validate"
    cookies.set("TOKEN", "validate");

    // Return an action object with the type LOGIN
    return {
      type: LOGIN,
    };
  } else {
    // If the provided username and password are incorrect, return an action object with the type LOGOUT
    return {
      type: LOGOUT,
    };
  }
};

// Action creator for logout
export const logout = () => {
  // Remove the "TOKEN" cookie
  cookies.remove("TOKEN");

  // Return an action object with the type LOGOUT
  return {
    type: LOGOUT,
  };
};
