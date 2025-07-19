import React from 'react';
import './gas.css';
import logo from "../assets/asd.png";
import SearchIcon from '@mui/icons-material/Search';

const Hero = () => {
  return (
    <section className="hero-container">
      {/* <div className="hero-content">
        <h1>Rule Your Shopping Kingdom</h1>
        <p>
          At <strong>LyonMart</strong>, discover an empire of products curated for every taste.
          Compare prices, shop smart, and experience the power of choice — all in one place.
        </p>
      </div> */}

      {/* <div className="search-container">
        <div className="search-box">
          <SearchIcon className="search-icon" />
          <input type="text" placeholder="Search for products, brands, or categories..." />
        </div>
        <select className="category-select">
          <option value="">All Categories</option>
          <option value="fashion">Fashion</option>
          <option value="electronics">Electronics</option>
          <option value="home">Home & Living</option>
          <option value="beauty">Beauty</option>
          <option value="sports">Sports</option>
       
        </select>
      </div> */}
      <div className="hero-content" />
    </section>
  );
};

export default Hero;
