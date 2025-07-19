import React, { useState } from 'react';
import axios from 'axios';
import './style.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from "../assets/lyom.png";
import logor from "../assets/signin-image.jpg"; // Ensure the logo image is in the correct path
import './logi.css';
import BouncingBalls from "./BouncingBalls";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { useFormik } from 'formik'
import * as yup from 'yup'
import AnimatedBackgrounds from './Amiatio';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        // Simple email format validation
        if (!/\S+@\S+\.\S+/.test(emailValue)) {
            setEmailError('Please enter a valid email');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError) {
            return; // Prevent submission if email is invalid
        }

        setLoading(true);
        try {
            const res = await axios.post("https://backend-details-0xik.onrender.com/customer/forgot-password", { email });
            setMsg(res.data.message);
        } catch (err) {
            setMsg(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

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
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
            {msg && <p className={msg.includes('success') ? 'success-msg' : 'error-msg'}>{msg}</p>}
        </div>
                        </div>
                    </section>

                </div>
            </div>


        </div>
    );
};

export default ForgotPassword;



