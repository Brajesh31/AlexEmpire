import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import BouncingBalls from "./BouncingBalls";
import logo from "../assets/lyom.png";
import fae from "../assets/lyomk.png";
import "./style.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useFormik } from 'formik'
import * as yup from 'yup'
import AnimatedBackgrounds from "./Amiatio";

const Signup = () => {

  const commerceFormik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      firstname: yup.string().min(4, "firstname cannot be less than 4 characters").required("firstname is required"),
      lastname: yup.string().min(4, "lastname cannot be less than 4 characters").required("lastname is required"),
      email: yup.string().email("must be a valid email").required("email cannot be empty"),
      password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "password must be at least 8 characters and must contain at least one letter and one number"),
    }),
    onSubmit: (value) => {
      console.log(value)
    }
  })
  console.log(commerceFormik.errors);
  console.log(commerceFormik.touched);
  
  const [userDetail, setUserDetail] = useState({
    firstname: "",
    lastname: "",
    email: "",
    Password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to other pages
  const [loading, setLoading] = useState(false); // Add loading state

  

  const RegisterUser = () => {
    if (!agreed) {
      alert("You must agree to the Terms and Conditions to register.");
      return;
    }
    setLoading(true); // Start loading
    console.log(userDetail);
    axios
      .post("https://backend-details-0xik.onrender.com/customer/signup", userDetail)
      .then((res) => {
        console.log(res);
        alert("Account created successfully! Please log in.");
        navigate("/login"); // Redirect to login page
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again.");
      }).finally(() => {
        setLoading(false); // Stop loading when request finishes
      });
  };

  return (
    <div>
      <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
        <AnimatedBackgrounds />
        <Link to='/'><img
          src={logo}
          alt="Logo"
          style={{ position: "absolute", top: "20px", left: "20px", width: "100px", height: "100px" }}
        /></Link>

        <div
          className="hurts"
        >
          <section className="signup">
            <div className="container" style={{backgroundColor:"#0B0C2A"}}>
              <div className="signup-content">
                <div className="signup-form">
                  <h2 className="form-title">Sign up</h2>
                  <form method="POST" onSubmit={commerceFormik.handleSubmit} className="register-form">
                    <div style={{ color: "red" }}>{commerceFormik.touched.firstname && commerceFormik.errors.firstname ? commerceFormik.errors.firstname : ""}</div>
                    <div className="form-group">
                      <label htmlFor="firstname">
                        <AccountCircleIcon />
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Your First Name"
                        value={commerceFormik.values.firstname}
                        onChange={(e) => {
                          commerceFormik.handleChange(e);
                          setUserDetail((prev) => ({ ...prev, firstname: e.target.value }));
                        }}
                        onBlur={commerceFormik.handleBlur}
                      />
                    </div>
                    <div style={{ color: "red" }}>{commerceFormik.touched.lastname && commerceFormik.errors.lastname ? commerceFormik.errors.lastname : ""}</div>
                    <div className="form-group">
                      <label htmlFor="lastname">
                        <AccountCircleIcon />
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Your Last Name"
                        value={commerceFormik.values.lastname}
                        onChange={(e) => {
                          commerceFormik.handleChange(e);
                          setUserDetail((prev) => ({ ...prev, lastname: e.target.value }));
                        }}
                        onBlur={commerceFormik.handleBlur}
                      />
                    </div>
                    <div style={{ color: "red" }}>{commerceFormik.touched.email  && commerceFormik.errors.email ? commerceFormik.errors.email : ""}</div>
                    <div className="form-group">
                      <label htmlFor="email">
                        <EmailIcon />
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        value={commerceFormik.values.email}
                        onChange={(e) => {
                          commerceFormik.handleChange(e);
                          setUserDetail((prev) => ({ ...prev, email: e.target.value }));
                        }}
                        onBlur={commerceFormik.handleBlur}
                      />
                    </div>
                    <div style={{ color: "red" }}>{commerceFormik.touched.password  && commerceFormik.errors.password ? commerceFormik.errors.password : ""}</div>
                    <div className="form-group">
                      <label htmlFor="password">
                        <LockIcon />
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={commerceFormik.values.password}
                        onChange={(e) => {
                          commerceFormik.handleChange(e);
                          setUserDetail((prev) => ({ ...prev, Password: e.target.value }));
                        }}
                        onBlur={commerceFormik.handleBlur}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="checkbox"
                        name="agree-term"
                        id="agree-term"
                        className="agree-term"
                        checked={agreed}
                        onChange={() => setAgreed(!agreed)} // Toggle state on click
                      />

                      <label htmlFor="agree-term" className="label-agree-term">
                        <span></span>I agree to all statements in{" "}
                        <a href="#" onClick={() => setShowModal(true)} className="term-service">
                          Terms of Service
                        </a>
                      </label>
                    </div>
                    <div className="form-group form-button">
                      <button
                        style={{
                          backgroundColor: "gold",
                          color: "black",
                          fontSize: "1rem",
                          padding: "10px 20px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                        onClick={RegisterUser}
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading} // Disable button when loading
                      >
                        {loading ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          "Register"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="signup-image">
                  <figure>
                    <img src={fae} alt="Sign up" />
                  </figure>
                  <Link className="signup-image-link" to="/login">
                    I am already a member
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            I must Love The BRAND
          </p>
          <p>
            I must Love The BRAND</p>
          <p>
            I must Love The BRAND
          </p>
          <p>
            I must Love The BRAND
          </p>
          <p>
            I must Love The BRAND</p>
          <p>
            I must Love The BRAND
          </p>
          <p>
            I must Love The BRAND
          </p>
          <p>
            I must Love The BRAND</p>
          <p>
            I must Love The BRAND
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
              setAgreed(!agreed);
            }}
          >
            I Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Signup;
