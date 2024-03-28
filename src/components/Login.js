import React, { useState } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigator = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Correct header key
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert("Invalid credentials");
      }
      if (json.success) {
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("location", json.location);
        localStorage.setItem("email", formData.email);
        console.log(localStorage.getItem("autoToken"));
        console.log(localStorage.getItem("email"));
        console.log(localStorage.getItem("location"));
        navigator("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while processing your request");
    }
  };
  return (
    <div
      className="mt-4 w-7"
      style={{
        width: "50%",
        border: "solid 2px white",
        justifyContent: "center",
        margin: "auto",
        boxShadow: "white 3px 3px 17px 22px",
        borderRadius: "3%",
      }}
    >
      <form
        className="mx-auto"
        onSubmit={handleSubmit}
        style={{ width: "60%", margin: "auto" }}
        method="Post"
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/SingUp" className="m-3 btn btn-danger">
          Create New User ID
        </Link>
      </form>
    </div>
  );
}
