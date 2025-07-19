import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import './style.css'
import { Link } from 'react-router-dom';
import logo from "../assets/lyom.png";
import logor from "../assets/signin-image.jpg"; // Ensure the logo image is in the correct path
import './logi.css';
import BouncingBalls from "./BouncingBalls";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { useFormik } from 'formik'
import * as yup from 'yup'
import AnimatedBackgrounds from './Amiatio';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // Add loading state
  const { token } = useParams();  // Get token from URL
  const navigate = useNavigate();

  useEffect(() => {
    // Validate token
    axios
      .post("https://backend-details-0xik.onrender.com/customer/validate-token", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === false) {
          setError("Invalid or expired token.");
        } else {
          setError(""); // Valid token
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError("Token validation failed.");
        setIsLoading(false);
      });
  }, [token]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    setIsLoading(true);
    // Send the new password to your backend
    axios
      .post(`https://backend-details-0xik.onrender.com/customer/reset-password/${token}`, {
        newPassword: newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setSuccess(true);
        setError("");
        setIsLoading(false);
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch(() => {
        setError("Failed to reset password.");
        setIsLoading(false);
      });
  };
  

  if (isLoading) {
    return <div>Loading...</div>;  // Loading message or spinner can be used
  }

  return (
    <div>
            <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
                {/* Bouncing Balls Canvas */}
                <AnimatedBackgrounds />
                <Link to='/'><img
                    src={logo}
                    alt="Logo"
                    style={{ position: "absolute", top: "20px", left: "20px", width: "100px", height: "100px" }}
                /></Link>

                {/* Signi Form */}
                <div >

                    <section className="signin">
                        <div className="container" style={{ backgroundColor: "#0B0C2A" }}>
                            
        <div className="forgot-container">
        <div>
      <h2>Reset Password</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success ? (
        <div>Password reset successfully. Redirecting...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              id="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>Reset Password</button>
        </form>
      )}
    </div>
        </div>
                        </div>
                    </section>

                </div>
            </div>


        </div>
  );
};

export default ResetPassword;




