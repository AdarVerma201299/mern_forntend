import React, { useState } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Singup() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });
  const [address, setaddress] = useState("");
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    };
    let latlong = await navLocation().then((res) => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude];
    });

    let [lat, long] = latlong;
    console.log(lat, long);

    const response = await fetch("http://localhost:5000/api/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latlong: { lat, long } }),
    });
    const { location } = await response.json();
    console.log(location);
    setaddress(location);
  };

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
      const response = await fetch("http://localhost:5000/api/userRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          age: formData.age,
          password: formData.password,
          location: address,
        }),
      });
      const json = await response.json();
      console.log(json);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("location", address);
      navigate("/");
      if (!json.success) {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while processing your request");
    }
  };

  return (
    <div
      className="container mt-4"
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
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            id="exampleInputName1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Age
          </label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-control"
            id="exampleInputName1"
          />
        </div>
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
        <div className="d-flex justify-center">
          <button
            type="button"
            onClick={handleClick}
            name="geolocation"
            className=" btn btn-success"
          >
            Click for current Location{" "}
          </button>
          {address !== "" ? (
            <input
              type="text"
              value={address}
              className="form-control m-3"
              placeholder={address}
            />
          ) : (
            ""
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/login" className="m-3 btn btn-danger">
          Allready Users
        </Link>
      </form>
    </div>
  );
}
