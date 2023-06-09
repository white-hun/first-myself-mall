import React, { useState } from "react";
import Axios from "axios";
import { FiCameraOff } from "react-icons/fi";

export default function Upload({ parentFunction }) {
  const [uploadFile, setUploadFile] = useState("");
  const [cloudinaryImage, setCloudinaryImage] = useState("");

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  const handleChange = (e) => setUploadFile(e.target.files[0]);
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", uploadPreset);

    Axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      .then((response) => {
        console.log("1", response);
        setCloudinaryImage(response.data.secure_url);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(uploadFile);
  };

  parentFunction(cloudinaryImage);

  return (
    <div>
      <section>
        <form>
          <div>
            <input type="file" onChange={handleChange} />
          </div>
          <div className="flex justify-center border-2 border-gray-300 w-56 h-72 bg-white mt-2">
            {cloudinaryImage ? (
              <img src={cloudinaryImage} alt="" />
            ) : (
              <div className="flex items-center p-4">
                <FiCameraOff className="text-2xl mr-3 text-gray-300" />
                <p className="text-xl font-semibold text-gray-300">이미지 없음</p>
              </div>
            )}
          </div>
          <button
            onClick={handleUpload}
            className="w-56 mt-3.5 mr-4 py-2 border-solid border-2 border-gray-200 hover:border-gray-700 rounded-md bg-white hover:scale-105 transition ease-in-out duration-300"
          >
            이미지 업로드
          </button>
        </form>
      </section>
    </div>
  );
}
