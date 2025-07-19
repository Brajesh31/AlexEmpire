import React from 'react';
import './gas.css';
import SearchIcon from '@mui/icons-material/Search';

const Searchar = () => {
  return (
    <div className="search-container">
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
    </div>
  );
};

export default Searchar;
