import React from 'react';
// import './gas.css'; // Make sure this path is correct based on your file structure
import { Link, useNavigate } from 'react-router-dom';
import './gasm.css';
import { motion } from 'framer-motion';

const MewGadgets = ({ products, addToCart }) => {
  return (
    <section className="top-sales-section">
    <h2 className="section-title">New Gadgets</h2>
    <div className="top-sales-grid">
      {products.map((product) => (
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
              ⭐ {product.rating} • {product.stock ? ' Out of stock' : 'In stock'}
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

export default MewGadgets;
