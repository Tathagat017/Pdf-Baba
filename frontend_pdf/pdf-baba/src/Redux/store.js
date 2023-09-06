import { reducer as authReducer } from "./authReducer/reducer.js";
import { reducer as chatReducer } from "./chatReducer/reducer.js";
import { applyMiddleware, Middleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers, legacy_createStore } from "redux";

const rootReducer = combineReducers({
  authReducer: authReducer,
  chatReducer: chatReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
