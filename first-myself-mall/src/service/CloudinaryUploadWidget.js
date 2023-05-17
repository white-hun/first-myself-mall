import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME; // replace with your own cloud name
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET; // replace with your own upload preset

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          document.getElementById("uploadedimage").setAttribute("src", result.info.secure_url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
