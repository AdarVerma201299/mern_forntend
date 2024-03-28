import React from "react";
import { RxCross2 } from "react-icons/rx";
import ReactDOM from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  background: "rgb(34,34,34)",
  transform: "translate(-50%,-50%)",
  zIndex: 1000,
  minHeight: "90%",
  width: "90%",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  background: "rgb(0,0,0,.7)",
  transform: "translate(-50%,-50%)",
  zIndex: 1000,
};

export default function Models({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
    {/* <div style={OVERLAY_STYLES}></div> */}
    <div style={MODAL_STYLES}>
        <button className="btn bg-danger fs-4" style={{position: "absolute", top: "10px", right: "10px"}} onClick={onClose}><RxCross2/></button>
        {children}
    </div>
    </>,
    document.getElementById("cart-root")
  );
}
