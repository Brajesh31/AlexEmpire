import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/lyom.png";
import './admin.css'; // Ensure the CSS file is imported
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BouncingBalls from "./BouncingBalls";

const Admin = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:7000/customer/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category", productCategory);
    formData.append("description", productDescription);
    formData.append("price", productPrice);

    imageFiles.forEach(file => {
      formData.append("images", file);
    });

    try {
      if (editingProduct) {
        await axios.put(`http://localhost:7000/customer/products/${editingProduct._id}`, formData);
        alert("Product updated successfully!");
      } else {
        await axios.post("http://localhost:7000/customer/add", formData);
        alert("Product added successfully!");
      }
      fetchProducts();
      setEditingProduct(null);
      setProductName("");
      setProductPrice("");
      setProductCategory("");
      setProductDescription("");
      setImageFiles([]);
      setPreviewImages([]);
    } catch (error) {
      alert("Error adding product");
      console.error(error);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:7000/customer/products/${productId}`);
        alert("Product deleted!");
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
    setPreviewImages(product.imageUrl || []);
  };

  return (
    <div className="admin-container">
      <Link to="/" className="logo-link">
        <img src={logo} alt="Logo" className="logo" width={80} height={80} />
      </Link>

      <div className="product-list">
        <h2>Add or Edit a Product</h2>
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
