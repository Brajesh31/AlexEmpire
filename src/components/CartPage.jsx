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
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode to decode JWT tokens


const CartPage = () => {
  
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

 const handleCheckout = async () => {
  try {
    const token = localStorage.getItem("existingToke");

    // Decode the token to get userId (you can use a library like `jwt-decode` to decode the token)
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId; // Assuming the userId is in the token

    const cleanedCartItems = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }));

    // Send userId along with cart items
    await axios.post(
      "https://backend-details-0xik.onrender.com/customer/cart/save",
      { userId, items: cleanedCartItems },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Cart saved successfully!");

    // Clear cart from localStorage and context
    localStorage.removeItem("cart");
    setCartItems([]);

    // Navigate to actual checkout route
    navigate('/checkout');
  } catch (err) {
    console.error("Error saving cart:", err);
  }
};


  
    return (
<>
<Header data={data}  cartCount={cartItems.length} />
    <div className=" py-5 mt-5" style={{ backgroundColor: '#F5F5F5 ', color: '#0B0C2A', minHeight: '100vh' }}>
      <h2 className="text-center mb-5">🛍️ Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center mt-5">
          <p>Your cart is empty!</p>
          <Link to="/" className="btn btn-warning mt-3">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {cartItems.map((item) => (
              <div key={item._id} className="col-md-6 has">
                <div className="card bg-light text-dark" id='cax'>
                  <div className="row g-0 align-items-center">
                    <div className="col-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded-start"
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">₦{item.price.toLocaleString()}</p>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-outline-dark btn-sm me-2"
                            onClick={() => updateQuantity(item._id, 'dec')}
                          >
                            -
                          </button>
                          <span className="me-2">{item.quantity}</span>
                          <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={() => updateQuantity(item._id, 'inc')}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-sm btn-danger mt-3"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove 🗑
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <h4>Total: <span style={{ color: '#D4AF37' }}>₦{getTotald().toFixed(2)}</span></h4>
            <button className="btn btn-warning mt-3" onClick={handleCheckout}>
  Proceed to Checkout
</button>
          </div>
          </>
      )}
    </div>
 </>
  );
};

export default CartPage;
