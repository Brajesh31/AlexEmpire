import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './style.css';
import './logi.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import TopSales from './TopSales';
import MewGadgets from './MewGadgets';
import Promo from './Promo';
import Searchar from './Searchar';
import ExploreMore from './ExploreMore';
import Newsletter from './Newsletter';
import Footer from './Footer';
import { CartContext } from './CartContext';
import { jwtDecode } from 'jwt-decode';

const Dashboard2 = () => {
  const storedToke = localStorage.getItem("existingToke");
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  const { cartItems, setCartItems, addToCart, updateQuantity, removeFromCart, getTotal, getTotald } = useContext(CartContext);

  // ✅ Verify customer token
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

  // // ✅ Load cart from localStorage on initial load
  // useEffect(() => {
  //   const storedCart = localStorage.getItem("cart");
  //   if (storedCart) {
  //     setCartItems(JSON.parse(storedCart));
  //   }
  //   setIsCartLoaded(true);
  // }, []);

  // ✅ Save cart to localStorage when changed
  useEffect(() => {
    if (isCartLoaded) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    setIsCartLoaded(true);
  }, [cartItems, isCartLoaded]);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://backend-details-0xik.onrender.com/customer/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Fetch cart from server
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("existingToke");
        if (!token) {
          setCartItems([]); // also clear in-memory
          setIsCartLoaded(true);
          return;
        }
        const decodedToken = jwtDecode(token); // ✅ Safe decode
        const userId = decodedToken.userId;
  
        const { data } = await axios.get(
          `https://backend-details-0xik.onrender.com/customer/get-cart/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
         // Correctly accessing the items array inside cart
    const serverCart = data.cart?.items || [];  // Accessing cart.items from the response
    console.log("Server Cart Data:", serverCart);
        console.log("Local Cart:", localCart);
        console.log("Cart Items:", cartItems); // Check if cartItems is populated

        
  
        // Merge the local and server cart or prioritize the server cart if available
        const finalCart = serverCart.length > 0 ? serverCart : localCart;
        
         // Set the cartItems to the context using setCartItems
         setCartItems(finalCart); // This updates the context's cartItems state

         // Persist to local storage after updating the context
         localStorage.setItem("cart", JSON.stringify(serverCart));
       } catch (err) {
         console.error("Error fetching cart:", err);
       }
     };
     console.log("Cart Items:", cartItems); // Check if cartItems is populated

  
    fetchCart();
  }, [setCartItems]);
  

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <Header data={data} toggleCart={toggleCart} cartCount={cartItems.length} />
      <Hero />
      <Searchar />
      <TopSales products={products} addToCart={addToCart} />
      <MewGadgets products={products} addToCart={addToCart} />
      <Promo />
      <ExploreMore />
      <Newsletter />
      <Footer />

      {isCartOpen && (
        <div className="cart active">
          <h2 className="cart-title">Your Cart</h2>
          <div className="cart-content">
          <div className="cart-content">
          {cartItems.length > 0 ? (
  cartItems.map((item) => (
    <div className="cart-box" key={item._id}>
      <img
        src={item.image || "/placeholder.png"}
        alt={item.name || "Item"}
        className="cart-img"
      />
      <div className="cart-details">
        <h2 className="cart-product-title">{item.name}</h2>
        <span className="cart-price">₦{item.price?.toLocaleString()}</span>
        <div className="cart-quantity">
          <button onClick={() => updateQuantity(item._id, "dec")}>-</button>
          <span className="number">{item.quantity}</span>
          <button onClick={() => updateQuantity(item._id, "inc")}>+</button>
        </div>
      </div>
      <div className="cart-remove" onClick={() => removeFromCart(item._id)}>
        🗑
      </div>
    </div>
  ))
) : (
  <p>Your cart is empty</p>
)}


          </div>

            <button
              style={{ width: "10%", height: "8%", border: "none", backgroundColor: "transparent" }}
              onClick={() => setIsCartOpen(false)}
              id="cart-close"
            >
              x
            </button>
          </div>
          <div className="total">
            <h3>Total: ${getTotald().toFixed(2)}</h3>
          </div>
          <button className="btn-buy">Buy Now</button>
          <button style={{
            borderRadius: "50%",
            justifySelf: "center",
            marginLeft: "70px",
            marginTop: "10px",
            border: "none"
          }}>
            <Link to="/cart" style={{ textDecoration: 'none', color: '#0B0C2A', textAlign: "center" }}>
              <div style={{ padding: "10px", cursor: "pointer" }}>View Full Cart</div>
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard2;
