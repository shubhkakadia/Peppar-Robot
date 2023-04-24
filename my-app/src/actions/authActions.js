export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (username, password) => {
  if (username === 'admin' && password === 'admin') {
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
  return {
    type: LOGOUT,
  };
};
