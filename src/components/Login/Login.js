import AuthService from '../../services/AuthService';
import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'; 
import Logo from '../../assets/logo.png';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    if (!username || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in both username and password fields.',
      });
      return;
    }

    try {
      console.log("username and password is",username,password)
      const userData = await AuthService.login(username, password);

      if (userData.status === 200) {
        localStorage.setItem('username', username);
        localStorage.setItem('userToken', userData.data.data.data.accessToken);
        localStorage.setItem('name', userData.data.data.data.name);
        localStorage.setItem('userId', userData.data.data.data.userId);

        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error);
      console.log("error is",error)
      Swal.fire({
        icon: 'error',
        title: 'Invalid credentials!!!',
        text: 'Username or password is typed incorrectly',
      });
    }
  };

  return (
    <div className="login-bg">
      <div>
        <div className="login-container">
          <img src={Logo} alt="Logo" className="logo" />
          <h2>Login</h2>
          <div className="login-form">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button onClick={handleLogin}>Login</button>
            <p>
              <Link to="/forgotPassword">Forgot Password?</Link>
            </p>
            <p>
              Don't have an account?{' '}
              <Link to="/signup">
                {' '}
                <span style={{ color: 'blue' }}>Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
