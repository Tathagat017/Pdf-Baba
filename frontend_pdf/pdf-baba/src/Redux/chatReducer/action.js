import { requestResponse, success, upload, error } from "./actionType";
import axios from "axios";
export const uploadAction = (file) => {
  return { type: upload, payload: file };
};

const requestResponseAction = () => {
  return { type: requestResponse };
};

const successAction = (bot_answer) => {
  return { type: success, payload: bot_answer };
};

const errorAction = (error) => {
  return { type: error, payload: error };
};

const url = "http://127.0.0.1:8000/pdf/upload/";
export const getResponse =
  (user_question, file, pdf_title) => async (dispatch) => {
    const obj = {
      pdf_file: file,
      user_question: user_question,
      pdf_title: pdf_title,
    };
    try {
      const formData = new FormData();
      formData.append("pdf_file", file);
      formData.append("user_question", user_question);
      formData.append("pdf_title", pdf_title);
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };
