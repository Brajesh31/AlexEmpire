import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/lyom.png";
import './logi.css';
import './admi.css';
import BouncingBalls from "./BouncingBalls";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Header from './Header';

const Admin = () => {
  // Safely retrieve existingToke from localStorage
  let storedToke = localStorage.getItem("existingToke")
  const navigate = useNavigate()
  const [data, setData] = useState()

  // State for form data
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
    const [products, setProducts] = useState([]);
    const [productDescription, setProductDescription] = useState([]);
  const [productCategory, setProductCategory] = useState("");
  const [percentageOff, setPercentageOff] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageFiles, setImageFiles] = useState([]); // Stores selected images
  const [previewImages, setPreviewImages] = useState([]); // For preview
  const [userData, setUserData] = useState(null); // To store user info
  const [saveName, setSaveName] = useState(null); // To store user ame

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/loginad');
    }else {
      axios.get("https://backend-details-0xik.onrender.com/customer/verifyy", {
        headers: {
                 'Authorization': `Bearer ${token}`
               }
             })
               .then((response => {
                 console.log(response.data.User);
                //  setUserData(response?.data?.User)
                 console.log(response.data.User.firstname);
                 setSaveName(response.data.User.firsname)
                 setUserData(response.data.User.firstname)
                  setData(response?.data?.User)
                  console.log(response?.data?.User);
                 
                 
                 
        
               })).catch((err) => {
                 console.log(err?.response?.data?.message);
                 navigate("/loginad");  
             })
  }}, []);

  // useEffect(() => {

  //   axios.get("http://localhost:7000/customer/verify", {
  //     headers: {
  //       'Authorization': `Bearer ${storedToke}`
  //     }
  //   })
  //     .then((response => {
  //       console.log(response.data.User);
  //       setData(response?.data?.User)

  //     })).catch((err) => {
  //       console.log(err?.response?.data?.message);
  //       navigate("/login"); // Redirect to login page
  //     })
  //   // if (!storedToke) {
  //   //   navigate("/login"); // Redirect to login page
  //   // }
  // }, [])

  // const [formData, setFormData] = useState({
  //     name: "",
  //     description: "",
  //     price: "",
  //     imageUrl: null  // Ensure this is correctly set: null
  // });

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setProductName(value);
    if (name === "category") setProductCategory(value);
    if (name === "description") setProductDescription(value);
    if (name === "price") setProductPrice(value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    setImageFiles(files); // Update imageFiles state
    console.log(imageFiles);
    
    
    // Preview the images
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls); // Set preview images
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category", productCategory);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
  
    imageFiles.forEach((file) => {
      formData.append("images", file); // must match .array("images", 5)
    });
  
    try {
      if (editingProduct) {
        // Update existing product
        await axios.put(`https://backend-details-0xik.onrender.com/customer/products/${editingProduct._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        alert("Product updated successfully!");
      } else {
        // Add new product
        await axios.post("https://backend-details-0xik.onrender.com/customer/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        alert("Product added successfully!");
      }
  
      setEditingProduct(null);
      setProductName("");
      setProductCategory("");
      setProductDescription("");
      setProductPrice("");
      setImageFiles([]);
      setPreviewImages([]);
      fetchProducts(); // Refresh product list
      // navigate("/dash2");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to submit product.");
    }
  };
  

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://backend-details-0xik.onrender.com/customer/products"); // Your route
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch on mount
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://backend-details-0xik.onrender.com/customer/products/${productId}`);
        alert("Deleted successfully!");
        fetchProducts();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete.");
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductCategory(product.category);
    setProductDescription(product.description);
    setProductPrice(product.price);
    setImageFiles([]); // Clear any new file uploads
    setPreviewImages(product.imageUrl || []); // Show current images if any
  };

  const styles = {
    form: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(15px)",
      borderRadius: "20px",
      padding: "30px",
      boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      maxWidth: "400px",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "15px"
    },
    input: {
      padding: "12px 16px",
      borderRadius: "10px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      outline: "none",
      fontSize: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "#fff",
      boxShadow: "0 0 0px rgba(255, 215, 0, 0)",
      transition: "0.3s",
    },
    button: {
      background: "gold",
      color: "black",
      fontWeight: "bold",
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease-in-out"
    },
    previewWrapper: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px"
    },
    previewImage: {
      width: "100px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "10px",
      border: "2px solid gold"
    }
  };




  return (
    <div className="admin-container">
      <Header data={userData}/>
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" width={80} height={80} />
          </Link>
    
          <div className="product-list">
            <h2>Admin Page</h2>
            <form onSubmit={handleSubmit} className="form-container">
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={productCategory}
                  onChange={e => setProductCategory(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={productDescription}
                  onChange={e => setProductDescription(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={productPrice}
                  onChange={e => setProductPrice(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
    
              <div className="preview-wrapper">
                {previewImages.map((image, index) => (
                  <img key={index} src={image} alt={`preview-${index}`} />
                ))}
              </div>
    
              <button type="submit" className="button">
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
    
            <div className="product-list">
              {products.map(product => (
                <div key={product._id} className="product-box">
                  <img src={product.imageUrl?.[0]} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
    
                  <div className="action-buttons">
                    <button
                      className="edit"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  );
};

export default Admin;


