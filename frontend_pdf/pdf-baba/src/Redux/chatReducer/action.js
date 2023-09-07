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
      dispatch(uploadAction(file));
      dispatch(requestResponseAction());
      const formData = new FormData();
      formData.append("pdf_file", file);
      formData.append("user_question", user_question);
      formData.append("pdf_title", pdf_title);
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.ans);
      dispatch(successAction(response.data.ans));
    } catch (e) {
      console.error(e);
      dispatch(errorAction(e));
    }
  };
const url2 = "http://127.0.0.1:8000/pdf/upload-only/";
export const uploadPdf = (file, pdf_title) => async (dispatch) => {
  const obj = {
    pdf_file: file,
    pdf_title: pdf_title,
  };
  try {
    dispatch(uploadAction(file));
    dispatch(requestResponseAction());
    const formData = new FormData();
    formData.append("pdf_file", file);

    formData.append("pdf_title", pdf_title);
    const response = await axios.post(url2, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
  } catch (e) {
    console.error(e);
    dispatch(errorAction(e));
  }
};

const url3 = "http://127.0.0.1:8000/pdf/answer-question/";

export const AskQuestion = (user_question) => async (dispatch) => {
  console.log(1);
  try {
    dispatch(requestResponseAction());
    const formData = new FormData();
    formData.append("user_question", user_question);
    const response = await axios.post(url3, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data.ans);
    dispatch(successAction(response.data.ans));
  } catch (e) {
    console.error(e);
    dispatch(errorAction(e));
  }
};
let url4 = "http://127.0.0.1:8000/pdf/delete-by-name/";
export const deleteOneFile = (name) => async (dispatch) => {
  //  login Functionality

  try {
    dispatch(requestResponseAction());
    const formData = new FormData();
    formData.append("pdf_name", name);
    const response = await axios.post(url4, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
  } catch (e) {
    console.error(e);
    dispatch(errorAction(e));
  }
};
