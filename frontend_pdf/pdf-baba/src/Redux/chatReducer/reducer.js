import {
  upload,
  success,
  error,
  requestResponse,
  userQuestion,
} from "./actionType";
const initialState = {
  upload: [],
  user_questions: "",
  bot_response: "",
  error: "",
  loading: false,
};
export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case upload: {
      return { ...state, upload: payload };
    }
    case success: {
      return {
        ...state,
        loading: false,
        error: false,
        bot_response: payload,
      };
    }
    case error: {
      return { ...state, loading: false, error: true };
    }

    case requestResponse: {
      return { ...state, loading: true };
    }

    default: {
      return state;
    }
  }
};
