import axios from "axios";
import getApiUrl from '../utility/apiUtils';

// Function to upload a file to S3
const uploadFileToS3 = async (file, onUploadProgress) => {

  try {
    // Fetch the presigned URL for uploading the file
    // const { data } = await axios.get(getApiUrl(`content/presignedUrl`));
    const { data } = await axios.get("https://augmate-webapp-server.vercel.app/api/v1/content/presignedUrl");
    const presignedUrl = data.data.uploadUrl;
    const savedLocation = data.data.location;


    // Configure Axios request for file upload with progress tracking
    const config = {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onUploadProgress(progress);
      }
    };

    // Upload the file to the presigned URL with the configured Axios request
    await axios.put(presignedUrl, file, config);
    
    // Log the saved location upon successful upload
    console.log('File uploaded:', savedLocation);

    return savedLocation;

  } catch (error) {
    // Handle error
    console.error('Error uploading file:', error);
    return error;
  }
};

export default uploadFileToS3;
