import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import FourOFour from "./components/FourOFour";
import Admin from "./components/Admin";
import AddProduct from "./components/AddProduct";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [showNav, setShowNav] = useState(true);
  return (
    <BrowserRouter>
        {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Home setShowNav={setShowNav} />} />
        <Route path="/about" element={<About setShowNav={setShowNav} />} />
        <Route path="/contact" element={<Contact setShowNav={setShowNav} />} />
        <Route path="/login" element={<Login setShowNav={setShowNav} />} />
        <Route path="/signup" element={<Signup setShowNav={setShowNav} />} />
        <Route path="/admin" element={<Admin setShowNav={setShowNav} />} />
        <Route path="/addproduct" element={<AddProduct setShowNav={setShowNav} />} />
        <Route path="*" element={<FourOFour setShowNav={setShowNav} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
