import React, { useEffect, useState } from "react";
import axios from "axios";
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

const Favorites = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const { cartItems, setCartItems, addToCart, updateQuantity, removeFromCart, getTotal } = useContext(CartContext);


  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteIds(storedFavorites);
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get("https://backend-details-0xik.onrender.com/customer/products");
        const filtered = data.filter((product) =>
          favoriteIds.includes(product._id)
        );
        setFavoriteProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    if (favoriteIds.length) fetchFavorites();
  }, [favoriteIds]);

  const storedToke = localStorage.getItem("existingToke");
  const navigate = useNavigate();
  const [data, setData] = useState();

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


  const removeFromFavorites = (id) => {
    const updatedFavorites = favoriteIds.filter(favId => favId !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavoriteIds(updatedFavorites);
  };




  return (
    <>
      <Header data={data} cartCount={cartItems.length} />
      <div className=" py-5 mt-5" style={{ backgroundColor: '#F5F5F5 ', color: '#0B0C2A', minHeight: '100vh' }}>


        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">❤️ Your Favorites</h1>
          <div className="row g-4">
            {favoriteProducts.map((item) => (
              <div key={item._id} className="col-md-4">
                <div className="card h-100 bg-light text-dark" id="cax">
                  <div className="row g-0 align-items-center">
                    <div className="col-4">
                      <img
                        src={item.imageUrl?.[0] || "/placeholder.jpg"}
                        alt={item.name}
                        className="img-fluid rounded-start"
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">₦{item.price}</p>
                        <div className="d-flex align-items-center">
                          <Link to={`/product/${item._id}`} className="product-link"> <button className="view-button">View</button> </Link>
                          
                        </div>
                        <button
                          className="btn btn-sm btn-danger mt-3"
                          onClick={() => removeFromFavorites(item._id)}
                        >
                          Remove from Favorites 🗑
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            ))}
            {favoriteProducts.length === 0 && (
              <p className="text-gray-500 col-span-full">No favorites yet. Start hearting some products!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;




