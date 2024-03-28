import React, { useEffect, useRef, useState } from "react";
import { UseDispatchCart, UseCart } from "./Contextreducer";
import { BsCart2 } from "react-icons/bs";
import Commnet_box from "./Commnet_box";
export default function Card(props) {
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");

  let Dispatch = UseDispatchCart();
  let data = UseCart();
  let priceRef = useRef();
  let option = props.options;
  let priceoption = Object.keys(option);

  let finalprice = qty * parseInt(option[size]);
  const handleAddToCart = async () => {
    if (!localStorage.getItem("email")) {
      alert("Please login");
    }

    let food = [];
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await Dispatch({
          type: "UPDATE",
          id: props.foodItems._id,
          price: finalprice,
          qty: qty,
        });
        return;
      } else {
        await Dispatch({
          type: "ADD",
          id: props.foodItems._id,
          name: props.foodItems.name,
          price: finalprice,
          img: props.foodItems.img,
          qty: qty,
          size: size,
        });
      }
    } else {
      await Dispatch({
        type: "ADD",
        id: props.foodItems._id,
        name: props.foodItems.name,
        price: finalprice,
        img: props.foodItems.img,
        qty: qty,
        size: size,
      });
    }
  };

  useEffect(() => {
    setsize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div className="card m-3" style={{ width: "16rem", maxHeight: "500px" }}>
        <img
          src={props.foodItems.img}
          className="card-img-top"
          alt="Your alt text"
          style={{ height: "150px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>
          {/* <p className="card-text fs-6">{props.foodIntem.description}</p> */}
          <div className="w-100">
            <select
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => setqty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setsize(e.target.value)}
            >
              {priceoption.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="d-inline m-2 h-100 fs-5">${finalprice}</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            <BsCart2 className="mx-1 fs-4"></BsCart2>Add to cart
          </button>
          <Commnet_box/>
        </div>
      </div>
    </div>
  );
}
