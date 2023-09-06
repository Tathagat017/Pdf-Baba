import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register";
import ChatInterface from "../Components/ChatInterface";
import Chat from "../Pages/Chat";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/" element={<Chat />}></Route>
    </Routes>
  );
};

export default AllRoutes;
