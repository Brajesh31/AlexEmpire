import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, Plus } from "lucide-react";
import Header from "./Header";
import "./rod.css"
import { useContext } from 'react';
import { CartContext } from './CartContext';

import { Link, useNavigate } from 'react-router-dom';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedCategory, setSelectedCategory] = useState(null);

  // const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userData, setUserData] = useState(null); // To store user info

  const { cartItems, addToCart, updateQuantity, removeFromCart, getTotal, getTotald } = useContext(CartContext);

  const navigate = useNavigate();

  // Get the token from local storage and check its validity
  let storedToke = localStorage.getItem("existingToke");

  useEffect(() => {
    if (!storedToke) {
      navigate("/login"); // Redirect to login page if no token
      return;
    }

    // Make a request to verify the token
    axios
      .get("https://backend-details-0xik.onrender.com/customer/verify", {
        headers: {
          Authorization: `Bearer ${storedToke}`,
        },
      })
      .then((response) => {
        // Successfully verified the token, store the user data
        setUserData(response.data.User);
      })
      .catch((err) => {
        // Token is invalid or expired, redirect to login
        console.log(err?.response?.data?.message);
        navigate("/login");
      });

    

    // Fetch products
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://backend-details-0xik.onrender.com/customer/products");
        setProducts(res.data);

        const uniqueCategories = [
          "All Categories", // Adding 'All Categories' option at the top
          ...new Set(res.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, [storedToke, navigate]);


  const [favoriteItems, setFavoriteItems] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const toggleFavorite = (productId) => {
    setFavoriteItems((prev) => {
      let updated;
      if (prev.includes(productId)) {
        updated = prev.filter((id) => id !== productId);
      } else {
        updated = [...prev, productId];
      }

      // Save to localStorage
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  // Filter products based on the selected category
  const filteredProducts = products
    .filter((product) =>
      selectedCategory && selectedCategory !== "All Categories"
        ? product.category === selectedCategory
        : true
    )
  const filteredProduct = products
    .filter((product) =>
      selectedBrands.length > 0
        ? selectedBrands.includes(product.brand)
        : true
    )
    .filter((product) =>
      selectedRating.length > 0
        ? selectedRating.includes(Math.floor(product.rating))
        : true
    )
    .filter((product) => product.price >= priceRange.min && product.price <= priceRange.max);
  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const [sortOption, setSortOption] = useState("Relevance");

const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortOption === "Price: Low to High") return a.price - b.price;
  if (sortOption === "Price: High to Low") return b.price - a.price;
  return 0;
});

  // const addToCart = (product) => {
  //   const existing = cartItems.find((item) => item._id === product._id);
  //   if (existing) {
  //     alert("Product already in cart");
  //     return;
  //   }

  //   const cartItem = {
  //     ...product,
  //     quantity: 1,
  //     image: product.imageUrl?.[0] || "", // Use the first image in imageUrl array
  //   };

  //   setCartItems([...cartItems, cartItem]);
  // };

  // const updateQuantity = (_id, action) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item._id === _id
  //         ? {
  //             ...item,
  //             quantity:
  //               action === "inc"
  //                 ? item.quantity + 1
  //                 : item.quantity > 1
  //                 ? item.quantity - 1
  //                 : item.quantity,
  //           }
  //         : item
  //     )
  //   );
  // };

  // const removeFromCart = (_id) => {
  //   setCartItems(cartItems.filter((item) => item._id !== _id));
  // };

  // const getTotal = () => {
  //   return cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  // };


  return (<div style={{ backgroundColor: "#F5F5F5" }} >
    <Header data={userData} toggleCart={toggleCart} cartCount={cartItems.length} />
    <div className="container mt-4">
      <div className="">
        {/* Sidebar */}
        <div className=" mt-5 mb-4 sidebar">
          <div className="border p-3 rounded bg-light text-dark">
            <h5>Categories</h5>
            {categories.map((category, i) => (
              <div className="form-check" key={i}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  id={`cat-${i}`}
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)} // Update selected category
                  hidden
                />
                <div
                  className="form-check-label"
                  onClick={() => setSelectedCategory(category)} // Update selected category
                >
                  {category}
                </div>
              </div>
            ))}
            {/* <hr />
            <h5>Brands</h5>
            {["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"].map((brand, i) => (
              <div className="form-check" key={i}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`brand-${i}`}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => {
                    setSelectedBrands((prev) =>
                      prev.includes(brand)
                        ? prev.filter((b) => b !== brand)
                        : [...prev, brand]
                    );
                  }}
                />
                <div className="form-check-label">
                  {brand}
                </div>
              </div>
            ))}  */}

            <hr />
            <h5>Ratings</h5>
            {[...Array(5)].map((_, i) => (
              <div className="form-check" key={i}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`rating-${i}`}
                  checked={selectedRating.includes(5 - i)}
                  onChange={() => {
                    setSelectedRating((prev) =>
                      prev.includes(5 - i)
                        ? prev.filter((r) => r !== 5 - i)
                        : [...prev, 5 - i]
                    );
                  }}
                />
                <div className="form-check-label">
                  {"★".repeat(5 - i)}
                </div>
              </div>
            ))}

            <hr />
            <h5>Price</h5>
            <div className="d-flex mb-2">
              <input
                type="number"
                className="form-control me-2"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
              />
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
              />
            </div>
            <button className="btn btn-primary w-100">Apply</button>
          </div>
        </div>

        {/* Product Grid */}
        <main className=" main-content">
          <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
            <h4 id="saw">
              {selectedCategory
                ? `${selectedCategory} (${filteredProducts.length})`
                : `All Products (${products.length})`}
            </h4>


            <select
  className="w-auto waxq"
  value={sortOption}
  onChange={(e) => setSortOption(e.target.value)}
>
  <option>Relevance</option>
  <option>Price: Low to High</option>
  <option>Price: High to Low</option>
</select>

            <select
              className="w-auto daxp"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option disabled>Categories</option>
              {categories.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="row g-3">
            {sortedProducts.map((product) => (
              <div className="col-md-4" key={product._id}>
                <div className="card h-100 position-relative">
                  <div className="position-absolute top-0 end-0 m-2 text-muted" onClick={() => toggleFavorite(product._id)} style={{ cursor: "pointer" }}>
                    <Heart
                      size={18}
                      color={favoriteItems.includes(product._id) ? "red" : "gray"}
                      fill={favoriteItems.includes(product._id) ? "red" : "none"}
                    />
                  </div>

                  <div className="muah">
                    <img
                      src={product.imageUrl?.[0] || "/placeholder.jpg"} // Ensure a fallback image
                      alt={product.name}
                      className="card-img-top p-3"
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">{product.name}</h6>
                    <p className="card-subtitle text-muted small">
                      {product.brand || "Unknown Brand"}
                    </p>
                    <p className="mb-1">
                      ⭐ {product.rating || 4} |{" "}
                      <span className="text-success">
                        {product.inStock ? "Out of stock" : "In stock"}
                      </span>
                    </p>
                    <div className="d-flex justify-content-between">
                      <strong className="text-danger">
                        ₦{product.price}
                      </strong>
                      <small className="text-muted text-decoration-line-through">
                        ₦{product.originalPrice?.toFixed(2) || 0}
                      </small>
                    </div>
                    <div style={{
                      position: "absolute", width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "red", textAlign: "center",
                      top: "245px", right: "0px", margin: "10px", color: "white", fontSize: "18px", fontWeight: "600", display: "flex", justifyContent: "center", cursor: "pointer"
                    }} onClick={() => addToCart(product)}> +          </div>
                    <button id="vad" className="btn w-100 mt-2">
                      <Link to={`/product/${product._id}`} className="btn vad w-100 product-link"> View</Link>

                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button className="page-link">Previous</button>
              </li>
              {[1, 2, 3, 4, 5].map((page) => (
                <li
                  key={page}
                  className={`page-item ${page === 1 ? "active" : ""}`}
                >
                  <button className="page-link">{page}</button>
                </li>
              ))}
              <li className="page-item">
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </main>
      </div>
    </div>


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

export default ProductListingPage;
