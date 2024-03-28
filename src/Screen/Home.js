import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
function Home() {
  const [search, setsearch] = useState("");
  const [foodcat, setFoodCat] = useState([]);
  const [fooditem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                />
                {/* <button className="btn  bg-success" type="submit">
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="..."
                style={{ height: "400px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://plus.unsplash.com/premium_photo-1680303989900-b4b002b520c5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="..."
                style={{ height: "400px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="..."
                style={{ height: "400px" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodcat.map((data) => (
          <div className="row mb-3">
            <div className="fs-3 m-3" key={data._id}>
              {data.CategoryName}{" "}
            </div>
            <hr/>
            {fooditem.length !== 0 ? (
              fooditem
                .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search)))
                .map((filterItem) => (
                  <div
                    key={filterItem._id}
                    className="col-12 col-md-6 col-lg-3"
                  >
                    <Card
                      foodItems={filterItem}
                      options={filterItem.options[0]}
                    ></Card>
                  </div>
                ))
            ) : (
              <div>No data</div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
