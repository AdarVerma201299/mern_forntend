import React, { useState } from "react";
import { UseCart, UseDispatchCart } from "../components/Contextreducer";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function Cart() {
  const [OrderLocation, setOrderLocation] = useState("");
  const data = UseCart();
  const Dispatch = UseDispatchCart();

  if (data.length === 0) {
    return <div className="m-5 w-100 text-center fs-3">Cart is Empty !</div>;
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  const location = localStorage.getItem("location");
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("email");
    const response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        delivery_location:OrderLocation,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("Order response:", response);
    if (response.status === 200) {
      Dispatch({ type: "Drop" });
    }
  };
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                      Dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div className="bg-success mt-5 justify-center">
            <input
              type="checkbox"
              value="Location 2"
              onChange={(e) => setOrderLocation(e.target.value)}
            />
            Location 2
          <hr />
          <span className="m-3">Current Location: {location}</span>
        </div>

        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
