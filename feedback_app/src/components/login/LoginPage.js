import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(login(username, password));
    }
  };

  const validate = () => {
    let valid = true;
    if (username.trim() === '') {
      setUsernameError('Username is required');
      valid = false;
    } else if (username.trim() !== 'admin'){
      setUsernameError("Invalid Username")
    }
    else {
      setUsernameError('');
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
      valid = false;
    } else if (username.trim() !== 'admin'){
      setPasswordError('Invalid Password')
    }else {
      setPasswordError('');
    }
    return valid;
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input className={`login-input username ${usernameError ? 'is-invalid' : ''}`} type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          {usernameError && <div className="invalid-feedback">{usernameError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="login-input2" class={`login-input password ${passwordError ? 'is-invalid' : ''}`} type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {passwordError && <div className="invalid-feedback">{passwordError}</div>}
        </div>
        <button className="login-button submit" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
