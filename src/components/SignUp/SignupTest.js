import * as Yup from 'yup';
import React, { useState } from 'react';
import './Signup.css';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import AuthService from '../../services/AuthService';
import Swal from 'sweetalert2';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email,setEmail]= useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Validate form inputs against the schema
      await validationSchema.validate(
        {
          name,
          username,
          email,
          password,
          confirmPassword,
        },
        { abortEarly: false } // This will collect all validation errors
      );

      // Continue with signup logic if validation passes

      const userData = await AuthService.signup(name, username,email, password);
      console.log('Logged in user:', userData);

      if (userData.status === 200) {
        Swal.fire('Congrats', 'Registered successfully!', 'success');
        navigate('/');
      }
    } catch (error) {
      console.error('Validation error:', error);

      if (error.name === 'ValidationError') {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid credentials!!!',
          text: 'Username already exists',
        });
      }
    }
  };

  return (
    <div className='signup-bg'>
      <div className="signup-container">
        <img src={Logo} alt="Logo" className="logo" />
        <h2>Sign Up</h2>
        <div className="signup-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="error">{errors.username}</p>}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          {!passwordsMatch && <p className="error">Passwords do not match</p>}
          <button onClick={handleSignup}>Sign Up</button>
          <p>
            Already have an account? <Link to="/"><span style={{ color: "blue" }}>Login</span></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
