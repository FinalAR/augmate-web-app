import "../assets/css/progress.css";
import "../assets/css/navBar.css";
import "../assets/css/popup.css";
import "../assets/css/elements.css";

import { Link } from 'react-router-dom';
import React, { useState, } from 'react';

import QRCode from 'qrcode.react';
import QRCodeGenerator from '../components/QRCodeGenerator';
import QRScanner from '../components/QRScanner';

import ImageHashGenerator from '../tools/ImageHashGenerator';

import uploadFileToS3 from '../tools/storageHandler';



function AdexploreHashPage() {

  const [phashId, setHashId] = useState("1111101001001110010100000000011100100111101100101001101010100000");

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   uploadFileToS3(file)
  //     .then((data) => {
  //       // Handle successful upload
  //       console.log('File uploaded successfully:', data);
  //     })
  //     .catch((error) => {
  //       // Handle upload error
  //       console.error('Error uploading file:', error);
  //     });
  // };

  const [progress, setProgress] = useState(0);

  const handleUploadProgress = (progress) => {
    setProgress(progress);
  };

  const handleFileUpload = async (file) => {
    try {
      const savedLocation = await uploadFileToS3(file, handleUploadProgress);
      console.log('File uploaded to:', savedLocation);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div id="container">
      <Link to='/home'>
        <button id="backButton">HOME</button>
      </Link>
      <div>
        <QRScanner />
      </div>
      <div>
        <h1>Image Hash Generator</h1>
        <ImageHashGenerator />
      </div>
      <h1>S3 Uploader</h1>
      <div>
        <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} />
        <progress value={progress} max={100} />
        <span>{progress}%</span>
      </div>
      {/* <div>
        <input type="file" onChange={handleFileUpload} />
      </div> */}
      {/* <div>
        <h1>QR Generator component</h1>
        <QRCodeGenerator perceptualHash={phashId} />
      </div> */}
      <div>
        <h1>QR Generator main</h1>
        <h2>QR Code</h2>
        <QRCode value={phashId} />
      </div>
    </div>
  );
}

export default AdexploreHashPage;
