import React,{ useState } from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Welcome from './components/Welcome'
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import Dashboard from './components/Dashboard'
import Dashboard2 from './components/Dashboard2'
import Profile from './components/Profile'
import Admin from './components/Admin'
import ProductDetails from './components/ProductDetails'
import ThreeImageCarousel from './components/Carousel'
import CategoryPage from './components/Category'
import Loginad from './components/Sigi'
import ProductListingPage from './components/Productlistig'
import { Category } from '@mui/icons-material'
import AnimationBackground from './components/Amiatio'
import About from './components/About'
import Contact from './components/Contact'
import CartPage from './components/CartPage'
import Checkout from './components/Checkout'
import ForgotPassword   from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Favorites from './components/Favorites'

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
  

  
 
    // Cart controls
    const toggleCart = () => setIsCartOpen(!isCartOpen);
  
    const addToCart = (product) => {
      const existing = cartItems.find((item) => item._id === product._id);
      if (existing) {
        alert("Product already in cart");
        return;
      }
      setCartItems([...cartItems, {
        ...product,
        quantity: 1,
        image: product.imageUrl?.[0] || "",
      }]);
    };
  
    const updateQuantity = (_id, action) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === _id
            ? {
                ...item,
                quantity:
                  action === "inc"
                    ? item.quantity + 1
                    : item.quantity > 1
                    ? item.quantity - 1
                    : item.quantity,
              }
            : item
        )
      );
    };
  
    const removeFromCart = (_id) => {
      setCartItems(cartItems.filter((item) => item._id !== _id));
    };
  
    const getTotal = () => {
      return cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    };
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dash" element={<Dashboard />}/>
        <Route path="/dash2" element={<Dashboard2 />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/carous" element={<ThreeImageCarousel />}/>
        <Route path="/product/:id" element={<ProductDetails />}/>
        <Route path="/products-by-category" element={<CategoryPage />} />
        <Route path="/loginad" element={<Loginad />} />
        <Route path="/list" element={<ProductListingPage />} />
        <Route path="/lists" element={<AnimationBackground />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<CartPage  cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} getTotal={getTotal}/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/reset/:token" element={<ResetPassword />} />
       // Inside 
       <Route path="/favorites" element={<Favorites />} />

        {/* <Route path="/lists" element={<Particles />} /> */}
      </Routes>
    </>
  )
}

export default App
