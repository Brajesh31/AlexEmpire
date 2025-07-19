import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/lyom.png";
import './logi.css';
import BouncingBalls from "./BouncingBalls";
import { Home, List, Phone, Heart, User, Settings, LogOut, Package } from "lucide-react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AnimatedBackgrounds from './Amiatio';
import { CartContext } from './CartContext';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {


    // Safely retrieve existingCustomer from localStorage
    // const storedCustomer = localStorage.getItem("existingCustomer")
    //   ? JSON.parse(localStorage.getItem("existingCustomer"))
    //   : null;

    // Safely retrieve existingToke from localStorage
    let storedToke = localStorage.getItem("existingToke")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState()
    const [Imagefile, setImagefile] = useState(null);
    const { cartItems, setCartItems, addToCart, updateQuantity, removeFromCart, getTotal } = useContext(CartContext);
      
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
      

  
    
    useEffect(() => {

        axios.get("https://backend-details-0xik.onrender.com/customer/verify", {
            headers: {
                'Authorization': `Bearer ${storedToke}`
            }
        })
            .then((response => {
                console.log(response.data.User);
                setData(response?.data?.User)

            })).catch((err) => {
                console.log(err?.response?.data?.message);
                navigate("/login"); // Redirect to login page
            })
        // if (!storedToke) {
        //   navigate("/login"); // Redirect to login page
        // }
    }, [])
       

    
  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page in history
  };




    return (
        <div>
            <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
                {/* Bouncing Balls Canvas */}
                <AnimatedBackgrounds />
                <Link to='/'><img
                    src={logo}
                    alt="Logo"
                    style={{ position: "absolute", top: "20px", left: "20px", width: "100px", height: "100px" }}
                /></Link>
                <div style={{ color: "white", position: "fixed", top: "20px", right: "20px", fontSize: "12px", display: "flex" }}>
                <Link to='/dash2' style={{ color: "white",fontSize: "12px", display: "flex", textDecoration:"none" }}>
                   <AccountCircleIcon style={{ fontSize: "35px", color: "gold" }} />
                      <h1 style={{ fontSize: "29px", marginLeft: "5px" }}>Dashboard</h1>
                      </Link>
                </div>

                {/* Signi Form */}
                <div>
                    <section style={{ justifyContent: "center", padding: "30px", display: "flex", alignItems: "center" }} className="signup">
                        <div style={{justifyContent:"center", justifyItems:"center" ,backgroundColor:"#0B0C2A"}} className='container' >
                            <h1 style={{color:"white"}}>My Profile</h1>
                            
                                <img src={data && data.profilePic} alt="" style={{ marginLeft:"50px",width: "90px", height: "90px", borderRadius: "50%", marginRight: "10px" }} />
                            <Link to='/dash'>
                                   <p style={{color:"gray", fontSize:"17px",textAlign:"left", fontWeight:"400"}}>Upload a new Profile Picture</p>
                            </Link>

                            <h1 style={{ fontSize: "29px", marginLeft: "5px", color:"gold", textAlign:"left", justifySelf:"left", marginTop:"40px" }}>First Name: {data ? data.firstname : "Guest"}!</h1>
                            <h5 style={{ fontSize: "29px", marginLeft: "5px", color:"gold",textAlign:"left", justifySelf:"left" , marginTop:"30px"}}>Last Name: {data ? data.lastname : "Guest"}!</h5>
                            <h5 style={{ fontSize: "29px", marginLeft: "5px", color:"gold",textAlign:"left", justifySelf:"left", marginTop:"30px" }}>E-mail: {data ? data.email : "Guest"}!</h5>

                            <div className="form-group form-button" style={{ marginTop:"50px" }}>
                                            <div className='mly' >
                                                <div style={{fontSize: "18px",marginRight:"50px", color:"gold"}}>Till we meet again,{data ? data.firstname : "Guest"}</div>
                                                <button
                                                 onClick={handleLogout}
                                                 style={{
                                                    backgroundColor: "gold",
                                                    color: "black",
                                                    fontSize: "1rem",
                                                    padding: "10px 20px",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                    fontWeight: "bold", 
                                                    display: "flex",
                                                     alignItems: "center",
                                                      gap: "6px", 
                                                      opacity: loading ? 0.7 : 1
                                                }} 
                                                type="button" data-mdb-button-init data-mdb-ripple-init 
                                                className="btn btn-primary btn-lg"
                                                disabled={loading}
                                                >{loading ? (
                                                    <div className="spinner-border spinner-border-sm text-light" role="status">
                                                     
                                                    </div>
                                                  ) : (
                                                    <>
                                                      <LogOut size={18} style={{ color: "black" }} />
                                                      <div>Logout</div>
                                                    </>
                                                  )}
                                                    </button>
                                            </div>
                                        </div>
                        </div>
                        <button onClick={handleGoBack} className="laz ">
                ← Go Back
              </button>
                    </section>
                    
               
                </div>

            </div>


        </div>
    );
};

export default Profile;


