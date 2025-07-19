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


const Login = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        Password: ""
    });

    const navigate = useNavigate(); // Hook to navigate to other pages
    const [loading, setLoading] = useState(false); // Add loading state

    const commerceFormik = useFormik({
        initialValues: {
            your_name: "",
            your_pass: ""
        },
        validationSchema: yup.object({
            your_name: yup.string().email("must be a valid email").required("email cannot be empty"),
            your_pass: yup.string().required("password cannot be empty"),
        }),
        onSubmit: (value) => {
            console.log(value)
        }
    })
    console.log(commerceFormik.errors);
    console.log(commerceFormik.touched);

    const LoginCustomer = async () => {
        try {
            setLoading(true);

            const response = await axios.post(
                "https://backend-details-0xik.onrender.com/customer/login",
                userDetails
            );

            console.log(response.data);
            console.log(response.data.existingCustomer);

            let damm = response.data.existingCustomer
            let damme = response.data.token

            // localStorage.setItem("existingCustomer", JSON.stringify(damm));//save the user info in existingCustomer to local storage
            localStorage.setItem("existingToke", damme);//save the user token in respose to local storage
            if (response.data.status) {
                alert("Login successful");
                navigate("/dash2"); // Redirect to login page

            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("An error occurred. Please try again.");
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
                            <div className="signin-content">
                                <div className="signin-image">
                                    <figure><img src={logor} alt="sing up image" /></figure>
                                    <Link className="signup-image-link" to='/signup'>Create an account</Link>
                                </div>

                                <div className="signin-form">
                                    <h2 className="form-title">Log In</h2>
                                    <form method="POST" className="register-form" id="login-form">

                                        <div style={{ color: "red" }}>
                                            {commerceFormik.touched.your_name && commerceFormik.errors.your_name ? commerceFormik.errors.your_name : ""}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email"><EmailIcon /></label>
                                            <input type="email"
                                                name="your_name"
                                                id="your_name"
                                                placeholder="Your Email"
                                                value={commerceFormik.values.your_name}
                                                onChange={(e) => {
                                                    commerceFormik.handleChange(e); // commerceFormik handles state update
                                                    setUserDetails((prev) => ({ ...prev, email: e.target.value })); // Local state update
                                                }}
                                                onBlur={commerceFormik.handleBlur}
                                            />
                                        </div>

                                        <div style={{ color: "red" }}>
                                            {commerceFormik.touched.your_pass && commerceFormik.errors.your_pass ? commerceFormik.errors.your_pass : ""}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pass"><LockIcon /></label>
                                            <input type="password"
                                                name="your_pass"
                                                id="your_pass"
                                                placeholder="Password"
                                                value={commerceFormik.values.your_pass}
                                                onChange={(e) => {
                                                    commerceFormik.handleChange(e); // commerceFormik handles state update
                                                    setUserDetails((prev) => ({ ...prev, Password: e.target.value })); // Local state update
                                                }}
                                                onBlur={commerceFormik.handleBlur} //
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                            <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                                        </div>
                                        <div className="form-group form-button">
                                            <div className='mly' >
                                                <button style={{
                                                    backgroundColor: "gold",
                                                    color: "black",
                                                    fontSize: "1rem",
                                                    padding: "10px 20px",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                    fontWeight: "bold"
                                                }} onClick={LoginCustomer} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" disabled={loading}>
                                                    {loading ? (
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    ) : (
                                                        "Login"
                                                    )}</button>
                                                <div className="form-group">
                                                    <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="social-login">
                                        <span className="social-label">Or login with</span>
                                        <ul className="socials">
                                            <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                            <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                            <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>


        </div>
    );
};

export default Login;


