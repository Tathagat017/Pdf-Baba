import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import FileUpload from "./Components/FileUpload";
import ChatInterface from "./Components/ChatInterface";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Navbar from "./Layouts/Navbar";
import Footer from "./Layouts/Footer";
import AllRoutes from "./Routes/AllRoutes";
import LoginAndRegister from "./Pages/LoginAndRegister";
import Chat from "./Pages/Chat";

function App() {
  return (
    <div>
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
