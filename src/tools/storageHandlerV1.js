import axios from "axios";
import getApiUrl from '../utility/apiUtils';

// Function to upload a file to S3
const uploadFileToS3 = async (file) => {

  try {

    const {data} = await axios.get(getApiUrl(`content/presignedUrl`));

    const presignedUrl = data.data.uploadUrl;
    const savedLocation = data.data.location;
    
    // console.log(presignedUrl);

    const response = await axios.put(presignedUrl, file);
    
    // Handle success
    console.log('File uploaded:', savedLocation);

    return savedLocation

  } catch (error) {

    // Handle error
    console.error('Error uploading file:', error);

    return error
  }
};


// Need to Implement other CRUD operations (e.g., listObjects, getObject, deleteObject) similarly

export default uploadFileToS3;