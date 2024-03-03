import React, { useState } from 'react';
import uploadFileToS3 from '../tools/storageHandler';

const UploadComponent = () => {
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
    <div>
      <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} />
      <progress value={progress} max={100} />
      <span>{progress}%</span>
    </div>
  );
};

export default UploadComponent;
