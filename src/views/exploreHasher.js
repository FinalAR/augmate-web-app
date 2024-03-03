import "../assets/css/progress.css";
import "../assets/css/navBar.css";
import "../assets/css/popup.css";
import "../assets/css/elements.css";

import { Link } from 'react-router-dom';
import React from 'react';


import ImageHashGenerator from '../tools/ImageHashGenerator';

import uploadFileToS3 from '../tools/storageHandler';



function AdexploreHashPage() {

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    uploadFileToS3(file)
      .then((data) => {
        // Handle successful upload
        console.log('File uploaded successfully:', data);
      })
      .catch((error) => {
        // Handle upload error
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div id="container">
      <Link to='/home'>
        <button id="backButton">HOME</button>
      </Link>
      <div>
        <h1>Image Hash Generator</h1>
        <ImageHashGenerator />
      </div>
      <h1>S3 Uploader</h1>
      <div>
        <input type="file" onChange={handleFileUpload} />
      </div>
    </div>
  );
}

export default AdexploreHashPage;
