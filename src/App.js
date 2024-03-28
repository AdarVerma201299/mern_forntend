import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import Home from "./Screen/Home";
import Login from "./components/Login";
import Singup from "./components/Singup";
import { CartProvider } from "./components/Contextreducer";
import Myorder from "./Screen/Myorder.js";
// import Navbar from './compnents/Navbar';
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SingUp" element={<Singup />} />
          <Route path="/Myorder" element={<Myorder/>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
