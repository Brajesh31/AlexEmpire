import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/lyom.png";
import './logi.css';
import BouncingBalls from "./BouncingBalls";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AnimatedBackgrounds from './Amiatio';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import './cart.css'; // Custom styles if needed
import Header from './Header';

const Checkout = () => {
     
        const storedToke = localStorage.getItem("existingToke");
        const navigate = useNavigate();
        const [data, setData] = useState();
        
        const [isCartLoaded, setIsCartLoaded] = useState(false); // NEW
        const { cartItems,setCartItems, addToCart, updateQuantity, removeFromCart, getTotal, getTotald } = useContext(CartContext);
       
    
      // Verify customer token
      useEffect(() => {
        axios.get("https://backend-details-0xik.onrender.com/customer/verify", {
          headers: {
            Authorization: `Bearer ${storedToke}`,
          },
        })
          .then((response) => {
            setData(response?.data?.User);
          })
          .catch((err) => {
            console.log(err?.response?.data?.message);
            navigate("/login");
          });
      }, []);
    
     // Load cart from localStorage on initial load
     useEffect(() => {
       const storedCart = localStorage.getItem("cart");
       if (storedCart) {
         setCartItems(JSON.parse(storedCart));
       }
       setIsCartLoaded(true); // Mark cart as loaded
     }, []);
     const total = getTotal(); // assume this returns a number
    const grandTotal = total + 20000;
    const formattedGrandTotal = grandTotal.toFixed(2);

  return (<>
    <Header data={data}  cartCount={cartItems.length} />
    <div className="checkout-container py-5" style={{ backgroundColor: "#F5F5F5", color: " #0B0C2A" }}>
      <div className="container" style={{backgroundColor: "white", color: "#0B0C2A", padding: "20px", borderRadius: "10px"}}>
        <h2 className="mb-4 text-center" style={{ color: "#D4AF37" }}>Checkout</h2>
        <div className="row">
          {/* Billing Details */}
          <div className="col-md-7">
            <h4 style={{ color: "#D4AF37" }}>Billing Information</h4>
            <form>
              <div className="mb-3">
                {/* <label className="form-label"></label> */}
                <input type="text" placeholder="Full Name" className="form-control" required />
              </div>
              <div className="mb-3">
                {/* <label className="form-label"></label> */}
                <input type="email" placeholder="Email Address" className="form-control" required />
              </div>
              <div className="mb-3">
                {/* <label className="form-label"></label> */}
                <input type="tel" placeholder="Phone Number" className="form-control" required />
              </div>
              <div className="mb-3">
                {/* <label className="form-label"></label> */}
                <input type="text" placeholder="Address" className="form-control" required />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  {/* <label className="form-label"></label> */}
                  <input type="text" placeholder="City" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  {/* <label className="form-label"></label> */}
                  <input placeholder="Zip Code" type="text" className="form-control" required />
                </div>
              </div>
              <div className="mb-4">
                {/* <label className="form-label"></label> */}
                <select className="form-select">
                <option>Country</option>
                  <option>Nigeria</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Other</option>
                </select>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="col-md-5">
            <div className="card bg-dark text-light shadow rounded">
              <div className="card-body">
                <h5 className="card-title mb-3" style={{ color: "#D4AF37" }}>Order Summary</h5>
                <ul className="list-group mb-3">
                  <li className="list-group-item bg-transparent border-light d-flex justify-content-between text-primary">
                    <span>Subtotal</span>
                    <strong>₦{getTotald().toFixed(2) }</strong>
                  </li>
                  <li className="list-group-item bg-transparent border-light d-flex justify-content-between text-primary">
                    <span>Shipping</span>
                    <strong>₦20000.00</strong>
                  </li>
                  <li className="list-group-item bg-transparent border-light d-flex justify-content-between text-warning">
                    <span>Total</span>
                    <strong>₦{formattedGrandTotal }</strong>
                  </li>
                </ul>

                {/* Payment Options */}
                <h6 className="mb-3">Payment Method</h6>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="radio" name="payment" defaultChecked />
                  <p className="form-check-label">Pay with Card</p>
                </div>
                <div className="form-check mb-4">
                  <input className="form-check-input" type="radio" name="payment" />
                  <p className="form-check-label">Pay on Delivery</p>
                </div>

                <button className="btn w-100" style={{ backgroundColor: "#D4AF37", color: "#111" }}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;
