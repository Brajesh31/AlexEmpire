import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/lyom.png";
import './logi.css';
import BouncingBalls from "./BouncingBalls";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AnimatedBackgrounds from './Amiatio';

const Dashboard = () => {


  // Safely retrieve existingCustomer from localStorage
  // const storedCustomer = localStorage.getItem("existingCustomer")
  //   ? JSON.parse(localStorage.getItem("existingCustomer"))
  //   : null;

  // Safely retrieve existingToke from localStorage
  let storedToke = localStorage.getItem("existingToke")
  const navigate = useNavigate()
  const [data, setData] = useState()
  const [Imagefile, setImagefile] = useState(null);
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

  const handleimagefile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file)
    reader.onload = (e) => {
      console.log(e.target.result);
      if (e.target.result) {
        setImagefile(e.target.result)
      }
    }
  }

  const UploadPics = () => {
    axios.post("https://backend-details-0xik.onrender.com/customer/upload", { Imagefile, email:data.email })
      .then((res) => {
        console.log(res);
        alert("Pic Uploaded successfully")
        navigate("/dash2"); 
      }).catch((err) => {
        console.log(err);
      })
  }

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
          <AccountCircleIcon style={{ fontSize: "35px", color: "gold" }} />
          <h1 style={{ fontSize: "29px", marginLeft: "5px" }}>Welcome {data ? data.firstname : "Guest"}!</h1>

        </div>
        {/* Signi Form */}
        <div className='freedo'>
          <div>
          <section style={{ justifyContent: "center", padding: "30px", display: "flex", alignItems: "center" }} className="signin">
            <div>
              <h1 style={{ color: "white", fontSize: "20px", textAlign: "center", marginBottom: "30px" }}>Upload a Profile Picture {data ? data.firstname : "Guest"}!</h1>
              <div style={{ display: "flex" }}><input type="file" onChange={handleimagefile} />
                <button style={{
                  backgroundColor: "gold",
                  color: "black",
                  fontSize: "1rem",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }} onClick={UploadPics}> Upload</button></div>
            </div>
          </section>
        </div>

        </div>
      </div>


    </div>
  );
};

export default Dashboard;


