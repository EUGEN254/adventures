import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Mybookings from "./pages/Mybookings";
import MoreAdventures from "./pages/MoreAdventures";
import Adventures from "./pages/Adventures";
import About from "./pages/About";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[7%] ">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/my-bookings" element={<Mybookings/>} />
        <Route path="/more-adventures" element={<MoreAdventures/>} />
        <Route path="/more-adventures/:id" element={<Adventures/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
