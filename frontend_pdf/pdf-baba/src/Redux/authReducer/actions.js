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

const loginSuccessAction = (payload) => {
  return { type: LOGIN_SUCCESS, payload };
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

const url = process.env.REACT_APP_URL;
//console.log(url);

export const signupFunction = (email, password) => async (dispatch) => {
  let obj = { email: email, password: password };
  dispatch(loginRequestAction());
  try {
    const res = await axios.post(`${url}user/signup`, obj);

    dispatch(signupSucesssAction());
  } catch (err) {
    dispatch(loginFailureAction());
    console.log(err);
  }
};

export const login = (email, password) => async (dispatch) => {
  //  login Functionality
  let obj = { email: email, password: password };
  dispatch(loginRequestAction());
  try {
    //  console.log(`${url}user/login`, obj);

    const res = await axios.post(`${url}user/login`, obj);
    sessionStorage.setItem("dealerId", res.data.dealerId);
    dispatch(loginSuccessAction(res.data.token));
  } catch (err) {
    alert("Login failed");
    dispatch(loginFailureAction());
    console.log(err);
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(logoutAction());
  sessionStorage.removeItem("dealerId");
};
