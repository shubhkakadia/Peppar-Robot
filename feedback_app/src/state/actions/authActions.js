import Cookies from "universal-cookie";
const cookies = new Cookies();

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (username, password) => {
  if (username === 'admin' && password === 'admin') {
    cookies.set("TOKEN", "validate")
    return {
      type: LOGIN,
    };
  } else {
    return {
      type: LOGOUT,
    };
  }
};

export const logout = () => {
  cookies.remove("TOKEN");
  return {
    type: LOGOUT,
  };
};
