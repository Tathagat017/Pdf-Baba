import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  LOGOUT_SUCCESS,
} from "./actionType";
import axios from "axios";

const loginRequestAction = () => {
  return { type: LOGIN_REQUEST };
};

const loginSuccessAction = (token) => {
  return { type: LOGIN_SUCCESS, payload: token };
};

const loginFailureAction = () => {
  return { type: LOGIN_FAILURE };
};

const signupSucesssAction = () => {
  return { type: SIGNUP_SUCCESS };
};

const logoutAction = () => {
  return { type: LOGOUT_SUCCESS };
};

const urlLogin = "http://127.0.0.1:8000/user/login/";
//console.log(url);
const urlRegister = "http://127.0.0.1:8000/user/register/";
export const signupFunction = (username, password) => async (dispatch) => {
  let obj = { username: username, password: password };
  dispatch(loginRequestAction());
  try {
    const res = await axios.post(urlRegister, obj);

    dispatch(signupSucesssAction());
  } catch (err) {
    dispatch(loginFailureAction());
    console.log(err);
  }
};

export const login = (username, password) => async (dispatch) => {
  //  login Functionality
  let obj = { username: username, password: password };
  dispatch(loginRequestAction());
  try {
    //  console.log(`${url}user/login`, obj);

    const res = await axios.post(urlLogin, obj);
    console.log(res);
    dispatch(loginSuccessAction(res.data.token));
  } catch (err) {
    alert("Login failed");
    dispatch(loginFailureAction());
    console.log(err);
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(logoutAction());
};
