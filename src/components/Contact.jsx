import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/lyom.png";
import './logi.css';
import BouncingBalls from "./BouncingBalls";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AnimatedBackgrounds from './Amiatio';

const Contact = () => {
  
      const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can send the form data to a backend or service here

    
  };

  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page in history
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
                <div style={{ color: "white", position: "fixed", top: "20px", right: "20px", fontSize: "12px", display: "flex" }}>
                    <Link to='/dash2' style={{ color: "white", fontSize: "12px", display: "flex", textDecoration: "none" }}>
                        <AccountCircleIcon style={{ fontSize: "35px", color: "gold" }} />
                        <h1 style={{ fontSize: "29px", marginLeft: "5px" }}>Dashboard</h1>
                    </Link>
                </div>

                {/* Signi Form */}
                <div>
                <section style={{ justifyContent: "center", padding: "30px", display: "flex", alignItems: "center", marginTop:"150px" }} className="signup">

                <div className="contact-page" style={{ padding: "20px", backgroundColor: "#F5F5F5" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Contact Us</h1>
      <div className="contact-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            {/* <label htmlFor="name" style={{ display: "block", fontSize: "16px", marginBottom: "5px" }}></label> */}
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder='Name'
              value={formData.name} 
              onChange={handleChange} 
              required
              style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            {/* <label htmlFor="email" style={{ display: "block", fontSize: "16px", marginBottom: "5px" }}></label> */}
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder='Email'
              value={formData.email} 
              onChange={handleChange} 
              required
              style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            {/* <label htmlFor="message" style={{ display: "block", fontSize: "16px", marginBottom: "5px" }}></label> */}
            <textarea 
              id="message" 
              name="message" 
              placeholder='Message'
              value={formData.message} 
              onChange={handleChange} 
              required
              rows="5"
              style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          <button 
            type="submit" 
            style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#1F3B73", color: "#fff", border: "none", borderRadius: "5px" }}
          >
            Send Message
          </button>
        </form>

        <button onClick={handleGoBack} className="laz ">
                ← Go Back
              </button>
      </div>
    </div>
                    </section>
                </div>

            </div>


        </div>
   
  );
};

export default Contact;
