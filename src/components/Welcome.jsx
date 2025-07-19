import React from 'react';
import { Link } from 'react-router-dom';
import BouncingBalls from "./BouncingBalls";
import logo from "../assets/lyom.png";
import logom from "../assets/qqq.png";
import AnimatedBackgrounds from './Amiatio';

const Welcome = () => {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
{/* Logo at the top-left corner */}
      

    
      <AnimatedBackgrounds />
      <img 
        src={logo} 
        alt="Logo" 
        style={{ position: "absolute", top: "20px", left: "20px", width: "100px", height: "100px" }}
      />

      {/* <h1 style={{
        position: "absolute",
        top: "35%",
        width: "100%",
        height:"fit-content",
        textAlign: "center",
        fontSize: "3rem",
        fontWeight: "bold",
        color: "white",
        textShadow: "2px 2px 10px rgba(0,0,0,0.7)"
      }}> 
     <svg  width="80%" height="190" viewBox="0 0 1000 150" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="3" stdDeviation="3" flood-opacity="0.6" />
        </filter>
    </defs>
    
    <g transform="translate(290,40) rotate(-15,60,50)" filter="url(#shadow)">
        <path d="M30 60 L50 20 L70 60 L90 20 L110 60 L130 20 L150 60" stroke="white" stroke-width="4" fill="none"/>
        <circle cx="50" cy="20" r="7" fill="gold" stroke="white" stroke-width="2"/>
        <circle cx="90" cy="20" r="7" fill="red" stroke="white" stroke-width="2"/>
        <circle cx="130" cy="20" r="7" fill="gold" stroke="white" stroke-width="2"/>
        <path d="M30 60 Q90 100 150 60" fill="none" stroke="white" stroke-width="4"/>
    </g>
    
    <text x="50%" y="90%" font-family="'Great Vibes', cursive" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">
        <tspan font-weight="bold" font-size="52">L</tspan>yon Mart
    </text>
</svg>

      </h1> */}

      {/* Center container */}
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexDirection: "column"
      }}>
        {/* Centered Image */}
        <div style={{ position: "relative", textAlign: "center" }}>
          <img 
            src={logom} 
            alt="Main Logo" 
            style={{ 
              width: "60vw", 
              maxWidth: "400px", 
              height: "auto" 
            }}
          />
          {/* Button on top of image */}
          <div className='daxz'>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <button style={{
                backgroundColor: "gold",
                color: "black",
                fontSize: "1rem",
                padding: "12px 24px",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
              }}>
                Get Started
              </button>
            </Link>
            </div>
            </div>
      </div>
    </div>
  );
}

export default Welcome;
