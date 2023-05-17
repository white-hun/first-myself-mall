import React, { useState } from "react";
import Axios from "axios";

const Upload = () => {
  const [uploadFile, setUploadFile] = useState("");
  const [cloudinaryImage, setCloudinaryImage] = useState("");

  const handleChange = (e) => setUploadFile(e.target.files[0]);
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "your upload preset name");

    Axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    )
      .then((response) => {
        console.log(response);
        setCloudinaryImage(response.data.secure_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <section>
        <form>
          <p>Upload Image</p>
          <div>
            <input type="file" onChange={handleChange} />
          </div>
          <button onClick={handleUpload}>Upload File</button>
        </form>
      </section>
      <section>
        <p>The resulting Image</p>
        <div>{cloudinaryImage && <img src={cloudinaryImage} alt="" />}</div>
      </section>
    </div>
  );
};

export default Upload;
