// src/components/AnimatedBackgrounds.jsx
import React from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion } from "framer-motion";
import './ami.css';

const AnimatedBackgrounds = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="background-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }}>
      {/* Particle Animation */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 60 },
            color: { value: "#D4AF37" },
            shape: { type: "circle" },
            opacity: { value: 0.6 },
            size: { value: 3 },
            move: { enable: true, speed: 1.2 },
            links: { enable: true, color: "#D4AF37", opacity: 0.4 }
          },
          background: { color: "transparent" }
        }}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />

      {/* Aurora Waves */}
      <div className="aurora-background"></div>

      {/* Gradient Glow */}
      <div className="gradient-glow"></div>

      {/* 3D Rotating Orb */}
      <div className="orb-container">
        <motion.div
          className="orb"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
      </div>

      {/* SVG Trail Animation */}
      <div className="svg-animation">
        <svg viewBox="0 0 1000 200">
          <path
            d="M0,100 Q250,0 500,100 T1000,100"
            stroke="#1F3B73"
            strokeWidth="3"
            fill="none"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="1000"
              to="0"
              dur="5s"
              repeatCount="indefinite"
            />
            
          </path>
        </svg>
      </div>

      {/* Floating Glow Orbs */}
      <motion.div
        className="floating-orb"
        animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '30%', left: '10%' }}
      >
        <div className="glow-orb" />
      </motion.div>

      <motion.div
        className="floating-orb"
        animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '60%', left: '80%' }}
      >
        <div className="glow-orb" />
      </motion.div>

      {/* Parallax Stars */}
      <div className="parallax-stars">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="star"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              position: 'absolute',
              backgroundColor: '#fff',
              borderRadius: '50%'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackgrounds;
