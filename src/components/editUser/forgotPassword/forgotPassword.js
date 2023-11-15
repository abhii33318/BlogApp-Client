import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./forgotPassword.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const BASE_URL = "http://localhost:8000";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOTP = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/users/sentOTP`, { email });

      if (response.status === 200) {
        setOtpSent(true);
        Swal.fire("Success", "OTP sent to your email", "success");
      }
    } catch (error) {
      
      Swal.fire(
        "Error",
        `Failed to send OTP: Please Provide registered Email`,
        "error"
      );
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/users/verifyOTP`, {
        email,
        otp,
      });

      if (response.status === 200) {
        setOtpVerified(true); // Set state to indicate OTP is verified
        Swal.fire("Success", "OTP Verified!", "success");
      }
    } catch (error) {
      Swal.fire("Error", `Failed to verify OTP: ${error.message}`, "error");
    }
  };

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/users/forgotPassword`, {
        email,
        newPassword,
      });

      if (response.status === 200) {
        Swal.fire("Success", "Password Reset Successfully!", "success");
        navigate("/");
        
      }
    } catch (error) {
      Swal.fire("Error", `Failed to reset password: ${error.message}`, "error");
    }
  };
  return (
    <div className="forgot-password">
      <div className="forgot-password-container">
        <h1>Forgot Password</h1>
        {!otpSent ? (
          <div className="email-input">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            <button onClick={handleSendOTP}>Send OTP</button>
            <p className="message">{message}</p>
          </div>
        ) : (
          <div className="otp-password-form">
            <p className="message">{message}</p>
            {!otpVerified ? (
              <div>
                {/* Form for OTP verification */}
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="otp-input"
                />
                <button onClick={handleVerifyOTP} className="verify-otp-button">
                  Verify OTP
                </button>
              </div>
            ) : (
              <div>
                {/* Form for password reset */}
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="password-input"
                />
                <button
                  onClick={handlePasswordReset}
                  className="reset-password-button"
                >
                  Reset Password
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
