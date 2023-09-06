import {
  SIGNUP_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_SUCCESS,
} from "./actionType";

const initialState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  token: "",
  signupsuccess: false,
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST: {
      return { ...state, isLoading: true, isError: false };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
        token: payload,
      };
    }
    case LOGIN_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }

    case SIGNUP_SUCCESS: {
      return { ...state, isLoading: false, signupsuccess: true };
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: false,
        token: "",
        signupsuccess: false,
      };
    }
    default: {
      return state;
    }
  }
};
