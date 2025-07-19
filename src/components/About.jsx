import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/lyom.png";
import './logi.css';
import BouncingBalls from "./BouncingBalls";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AnimatedBackgrounds from './Amiatio';

const About = () => {
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

                    <div>
                        <div className="about-page" style={{ padding: "20px", backgroundColor: "#F5F5F5" }}>
                            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>About Us</h1>
                            <div className="about-content" style={{ maxWidth: "800px", margin: "0 auto" }}>
                                <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
                                    LyonMart is your one-stop shop for the latest in electronics, gadgets, and accessories.
                                    Our mission is to offer the best quality products at affordable prices while providing
                                    exceptional customer service. Whether you're looking for the latest smartphone, gaming gear,
                                    or tech accessories, we have it all.
                                </p>
                                <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
                                    Our team is passionate about technology and strives to bring the best shopping experience
                                    to our customers. We're constantly updating our inventory with the newest trends and tech
                                    innovations to ensure that you have access to the best products available.
                                </p>
                            </div>
                        </div>
                    </div>
                    </section>
                </div>

            </div>


        </div>

    )
}

export default About