import React, { useEffect, useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import "./FileUpload.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getResponse,
  uploadAction,
  uploadPdf,
  deleteOneFile,
} from "../Redux/chatReducer/action";

const FileUpload = ({ forcedRender, render }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileData, setFileData] = useState([]);
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
    const newSelectedFiles = [...selectedFiles];
    const newFileData = [...fileData];

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];

      newSelectedFiles.push(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        newFileData.push({
          id: uniqid(),
          filename: file.name,
          filetype: file.type,
          fileimage: reader.result,
          datetime: file.lastModifiedDate.toLocaleString("en-IN"),
          filesize: filesizes(file.size),
        });
        setFileData(newFileData);
      };
      reader.readAsDataURL(file);
    }

    setSelectedFiles(newSelectedFiles);
  };

  const deleteFile = (id) => {
    const newSelectedFiles = selectedFiles.filter((file, index) => {
      return index !== id;
    });
    setSelectedFiles(newSelectedFiles);

    const newFileData = fileData.filter((data, index) => {
      return index !== id;
    });
    setFileData(newFileData);
  };

  const fileUploadSubmit = async (e) => {
    e.preventDefault();

    if (selectedFiles.length > 0) {
      // Perform file upload logic here for all selected files
      // You can use the selectedFiles array to upload all selected PDF files
      // and handle the response accordingly
      for (let i = 0; i < selectedFiles.length; i++) {
        await dispatch(uploadPdf(selectedFiles[i], selectedFiles[i].name));
      }

      await forcedRender((prev) => !prev);
      console.log("1", render);
      //console.log(render);
      //console.log(initial);

      // Clear the selected files and file data
      setSelectedFiles([]);
      setFileData([]);
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
                    <h6>Multiple File Upload With Preview</h6>
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
                        multiple // Allow multiple file selection
                      />
                      <span>
                        Drag and drop or{" "}
                        <span className="file-link">Choose your files</span>
                      </span>
                    </div>
                  </div>
                  {fileData.map((file, index) => (
                    <div className="kb-attach-box mb-3" key={file.id}>
                      <div className="file-atc-box">
                        <div className="file-image">
                          <i className="far fa-file-alt"></i>
                        </div>
                        <div className="file-detail">
                          <h6>{file.filename}</h6>
                          <p>
                            <span>Size : {file.filesize}</span>
                            <span className="ml-2">
                              Modified Time : {file.datetime}
                            </span>
                          </p>
                          <div className="file-actions">
                            <button
                              type="button"
                              className="file-action-btn"
                              onClick={() => deleteFile(index)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
