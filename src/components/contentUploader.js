import React, { useState } from 'react';
import uploadFileToS3 from '../tools/storageHandler';
import { ErrorMessage} from "formik";

const UploadComponent = ({ validationProps, fieldName }) => {
  const [progress, setProgress] = useState(0);

  const handleUploadProgress = (progress) => {
    setProgress(progress);
  };

  const handleFileUpload = async (file) => {
    try {
      // const savedLocation = await uploadFileToS3(file, handleUploadProgress);
      // console.log('File uploaded to:', savedLocation);
      validationProps.setFieldValue(fieldName, "https://augmate-bucket.s3.ap-south-1.amazonaws.com/2024-03-10T18-15-37.967Z_model");
      // onChangeFile("https://augmate-bucket.s3.ap-south-1.amazonaws.com/2024-03-10T18-15-37.967Z_model");
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => {
        setProgress(0);
        handleFileUpload(e.target.files[0]);
      }}
      className={`mt-2 form-control ${validationProps.touched[fieldName] && validationProps.errors[fieldName] ? "is-invalid" : ""}`}
      />
      <progress value={progress} max={100} />
      <span>{progress}%</span>
      <ErrorMessage
        component="div"
        name="imageTargetSrc"
        className="invalid-feedback"
      />
    </div>
  );
};

export default UploadComponent;
