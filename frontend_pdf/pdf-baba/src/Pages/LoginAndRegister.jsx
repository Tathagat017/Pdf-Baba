import React, { useState } from "react";
import Login from "../Components/Login";
import Register from "../Components/Register";

const LoginAndRegister = () => {
  const [login, setLogin] = useState(false);

  return <div>{login ? <Login /> : <Register />}</div>;
};

export default LoginAndRegister;
