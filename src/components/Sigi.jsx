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


const Loginad = () => {
    const [firstname, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // Hook to navigate to other pages
    const [loading, setLoading] = useState(false); // Add loading state

    // const commerceFormik = useFormik({
    //     initialValues: {
    //         your_name: "",
    //         your_pass: ""
    //     },
    //     validationSchema: yup.object({
    //         your_name: yup.string().email("must be a valid email").required("email cannot be empty"),
    //         your_pass: yup.string().required("password cannot be empty"),
    //     }),
    //     onSubmit: (value) => {
    //         console.log(value)
    //     }
    // })
    // console.log(commerceFormik.errors);
    // console.log(commerceFormik.touched);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://backend-details-0xik.onrender.com/customer/loginad', {
                firstname,
                password,
            });
            localStorage.setItem('adminToken', res.data.token);
            navigate("/admin"); // Redirect after login
        } catch (err) {
            alert('Login failed');
        }
    };



    return (
        <div>
            <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
                {/* Bouncing Balls Canvas */}
                <AnimatedBackgrounds  />
                <Link to='/'><img
                    src={logo}
                    alt="Logo"
                    style={{ position: "absolute", top: "20px", left: "20px", width: "100px", height: "100px" }}
                /></Link>

                {/* Signi Form */}
                <div className='freedo'>

                    <form onSubmit={handleLogin}>
                        <h2 style={{width:"100%", textAlign:"center"}}>Admin Login</h2>
                        <input value={firstname} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                       <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                       <button style={{width:"20%", textAlign:"center", justifySelf:"center"}} type="submit">Login</button>
                       </div>
                    </form>

                </div>
            </div>


        </div>
    );
};

export default Loginad;


