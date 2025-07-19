import { React, useState, useEffect, useRef , useContext} from 'react';
import './gas.css';
import './gasm.css';
import logo from "../assets/lyom.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Home, List, Phone, Heart, User, Settings, LogOut, Package } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { color } from 'framer-motion';
import { CartContext } from './CartContext';
import { jwtDecode } from 'jwt-decode';

const Header = ({ data, toggleCart, cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate()
  const menuRef = useRef(null);
  const profileRef = useRef(null);
      const { cartItems, setCartItems, addToCart, updateQuantity, removeFromCart, getTotal } = useContext(CartContext);
  

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
  
    const handleScroll = () => {
      setMenuOpen(false);
    };
  
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  useEffect(() => {
    const seenBefore = localStorage.getItem('seenProfileTip');
    if (!seenBefore) {
      setShowPulse(true);
      localStorage.setItem('seenProfileTip', 'true');
      setTimeout(() => setShowPulse(false), 2000);
    }
  }, []);

   const handleLogout = async () => {
  setLoading(true); 
          try {
            const token = localStorage.getItem("existingToke");
        
            if (token && cartItems.length > 0) {
              const decodedToken = jwtDecode(token);
              const userId = decodedToken.userId;
        
              const cleanedCartItems = cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity
              }));
        
              await axios.post(
                "https://backend-details-0xik.onrender.com/customer/cart/save",
                { userId, items: cleanedCartItems },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
        
              console.log("Cart saved before logout.");
            }
        
            // Clear stored token and cart
            localStorage.removeItem("existingToke");
            localStorage.removeItem("cart");
            setCartItems([]); // Clear from context
        
            // Redirect user
            navigate("/login");
        
            alert("You've been logged out successfully!");
          } catch (error) {
            console.error("Failed to save cart on logout:", error);
        
            // Still proceed to logout
            localStorage.removeItem("existingToke");
            localStorage.removeItem("cart");
            localStorage.clear();
            setCartItems([]);
            navigate("/login");
          }finally {
            setLoading(false); 
          }
        
        };
        

  return (
    <header className="header">
      <nav className="main-nav">
        <div className="nav-left">
          <img
            src={logo}
            alt="Logo"
            style={{
              position: "absolute",
              top: "-20px",
              left: "20px",
              width: "100px",
              height: "100px"
            }}
          />
        </div>

        <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div className="cart-wrapper" style={{ position: "relative" }}>
            <ShoppingCartIcon
              onClick={toggleCart}
              style={{ fontSize: "30px", cursor: "pointer" }}
            />
            <span className="cart-item-count">{cartCount}</span>
          </div>

          <div
            onClick={toggleMenu}
            className="profile-section mex"
            title="Tap to open menu"
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            ref={profileRef}
          >
            <img
              src={data?.profilePic}
              alt="Profile"
              className={`profile-pic ${showPulse ? 'pulse-once' : ''}`}
              style={{
                width: "50px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "5px"
              }}
            />
            <h1 className="username" style={{ fontSize: "29px", marginRight: "5px" }}>
              {data ? data.firstname : "Guest"}!
            </h1>
            <ExpandMoreIcon
              className={`dropdown-icon ${menuOpen ? 'rotate-chevron' : ''}`}
              style={{
                fontSize: "24px",
                color: "black",
                transition: "transform 0.3s ease"
              }}
            />
          </div>
        </div>

        {menuOpen && (
          <div className="dropdown-container" ref={menuRef}>
            <ul className="nav-links-list">
              <li ><Link to="/dash2" ><Home size={18} style={{color:"orange"}}/><div> Home</div></Link></li>
              <li><Link to="/list"><List size={18} /> <div>Categories</div></Link></li>
              <li><Link to="/favorites"><Heart size={18} style={{color:"red"}} className="text-red-500" /> <div>Favorites</div></Link></li>
              <li><Link to="/contact"><Phone size={18} style={{color:"green"}}/> <div>Contact</div></Link></li>
            </ul>

            <hr style={{ margin: '8px 0' }} />

            <ul className="profile-actions-list">
              <li><Link to="/profile"><User size={18} style={{color:"purple"}} /> <div>My Profile</div></Link></li>
              <li><Link to="/orders"><Package size={18} style={{color:"brown"}} /> <div>My Orders</div></Link></li>
              {/* <li><Link to="/settings"><Settings size={18} /><div> Settings</div></Link></li> */}
              <li>
  <button
    onClick={handleLogout}
    type="button"
    className="btn btn-primary btn-lg"
    disabled={loading}
    style={{ display: "flex", alignItems: "center", gap: "6px", opacity: loading ? 0.7 : 1 }}
  >
    {loading ? (
      <div className="spinner-border spinner-border-sm text-light" role="status">
        
      </div>
    ) : (
      <>
        <LogOut size={18} style={{ color: "black" }} />
        <div>Logout</div>
      </>
    )}
  </button>
</li>

            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
