import React, { useState } from 'react';
import './changePassword.css'; // Assuming your CSS file is named 'ChangePassword.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const BASE_URL = 'http://localhost:8000';
  let userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') setCurrentPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentPassword.length < 6) {
      setError('Current password must contain at least 6 characters');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must contain at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    try {
      const response = await axios.put(`${BASE_URL}/users/changePassword/${userId}`, {
        currentpassword: currentPassword,
        newPassword: newPassword,
      });

      if (response.status === 200) {
        Swal.fire('Success!', response.data.message, 'success');
        navigate('/editProfile')
      } else {
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      setError('please check your current password');
      Swal.fire('Error', 'Error while changing password', 'error');
    }
  };

  return (
    <div className='change-password'>
    <div className="change-password-container">
      <h2>Change Password</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currentPassword">Current Password (min. 6 characters)</label>
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            className="password-input"
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password (min. 6 characters)</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            className="password-input"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="password-input"
          />
        </div>
        <button type="submit" className="submit-button">Change Password</button>
      </form>
    </div>
    </div>
  );
};

export default ChangePassword;
