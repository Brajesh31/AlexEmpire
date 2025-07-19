


import React from 'react';
import './gasm.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TopSales = ({ products, addToCart }) => {

  // Function to shuffle the products array
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
 // Shuffle the products array
 const shuffledProducts = shuffleArray(products);
  // Get the first 8 products from the shuffled array
  return (
    <section className="top-sales-section">
      <h2 className="section-title">Top Sales</h2>
      <div className="top-sales-grid">
      {shuffledProducts.map((product) => (
          <motion.div
            key={product.id}
            className="product-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            
              {product.imageUrl?.length > 0 && (
                <img src={product.imageUrl[0]} alt={product.name} className="product-image" />
              )}
              <h3 id='caw'>{product.name}</h3>
              <p className="category">{product.category}</p>
              <div className="rating">
                ⭐ {product.rating} • {product.stock ? 'Out of stock' : 'In stock'}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%' }}>
               <div className="price">₦{product.price}</div>
                 <Link to={`/product/${product._id}`} className="product-link"> <button className="view-button">View</button> </Link>
              </div>
           
            <div onClick={() => addToCart(product)} className="add-to-cart">
              Add to Cart
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopSales;
