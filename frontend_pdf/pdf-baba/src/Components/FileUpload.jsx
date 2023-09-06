import React, { useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import "./FileUpload.css";
import { useSelector, useDispatch } from "react-redux";
import { getResponse, uploadAction } from "../Redux/chatReducer/action";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const dispatch = useDispatch();
  const initial = useSelector((state) => state.chatReducer);
  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData({
          id: uniqid(),
          filename: file.name,
          filetype: file.type,
          fileimage: reader.result,
          datetime: file.lastModifiedDate.toLocaleString("en-IN"),
          filesize: filesizes(file.size),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteFile = () => {
    setSelectedFile(null);
    setFileData(null);
  };

  const fileUploadSubmit = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      // Perform file upload logic here
      // You can use the selectedFile object to upload the single PDF file
      // and handle the response accordingly
      let user_question = "What is the context of this document?";
      dispatch(getResponse(user_question, selectedFile, selectedFile.name));
      console.log(initial);
    } else {
      alert("Please select a file");
    }
  };

  return (
    <div className="fileupload-view">
      <div className="row justify-content-center m-0">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <div className="kb-data-box">
                <div className="kb-modal-data-title">
                  <div className="kb-data-title">
                    <h6>Single File Upload With Preview</h6>
                  </div>
                </div>
                <form onSubmit={fileUploadSubmit}>
                  <div className="kb-file-upload">
                    <div className="file-upload-box">
                      <input
                        type="file"
                        id="fileupload"
                        className="file-upload-input"
                        onChange={handleFileChange}
                      />
                      <span>
                        Drag and drop or{" "}
                        <span className="file-link">Choose your file</span>
                      </span>
                    </div>
                  </div>
                  {fileData && (
                    <div className="kb-attach-box mb-3">
                      <div className="file-atc-box">
                        <div className="file-image">
                          <i className="far fa-file-alt"></i>
                        </div>
                        <div className="file-detail">
                          <h6>{fileData.filename}</h6>
                          <p>
                            <span>Size : {fileData.filesize}</span>
                            <span className="ml-2">
                              Modified Time : {fileData.datetime}
                            </span>
                          </p>
                          <div className="file-actions">
                            <button
                              type="button"
                              className="file-action-btn"
                              onClick={deleteFile}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="kb-buttons-box">
                    <button
                      type="submit"
                      className="btn btn-primary form-submit"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
