import React from 'react'
import './gas.css';
import jogo from "../assets/promo3.png";
import jogod from "../assets/lyomk.png";
import PixelTransition from './PixelTransition';


const Promo = () => {
  return (
    <>
      <section className="promo-banner">
        <div className="promo-content">
          <div className="promo-image">
            <PixelTransition
              firstContent={
                <img
                src={jogo}
                  alt="default pixel transition content, a cat!"
                  style={{ width: "120%", height: "100%", objectFit: "cover", marginLeft:"0px" }}
                />
              }
              secondContent={
                <img
                src={jogod}
                  alt="default pixel transition content, a cat!"
                  style={{ width: "120%", height: "100%", objectFit: "cover", marginLeft:"0px" }}
                />
              }
              gridSize={12}
              pixelColor='#ffffff'
              animationStepDuration={0.4}
              className="custom-pixel-card"
            />
            <span className="discount-tag">50% OFF</span>
          </div>
          <div className="promo-text">
            <h3>BLACK <span>FRIDAY</span></h3>
            <p>MEGA OFFER</p>
            <p className="small">Power In Every Purchase</p>
            <button className="shop-now">SHOP NOW</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Promo