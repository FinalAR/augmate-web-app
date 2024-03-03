import AWS from 'aws-sdk';

// import dotenv from 'dotenv';
// dotenv.config();

const s3 = new AWS.S3({
    // Setting AWS credentials and region
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_AWS_REGION,
  });
  

  // Function to upload a file to S3
const uploadFileToS3 = async (file) => {
    
    // Generate a timestamp
  const timestamp = new Date().toISOString().replace(/:/g, '-');

  // Rename the file with the timestamp
  const renamedFileName = `${timestamp}_model`;

    const params = {
      Bucket: process.env.BUCKET,
      Key: renamedFileName,
      Body: file,
    };
    console.log("Bucket Name1 :"+ process.env.BUCKET);
    console.log("Bucket Key1 :"+ renamedFileName);

    console.log("Bucket Name :"+ params.Bucket);
    console.log("FileName: " + params.Key);
    try {
      const data = await s3.upload(params).promise();

       // Handle success
      console.log('File uploaded:', data.Location);

      return data
    } catch (error) {
      
      // Handle error
      console.error('Error uploading file:', error);

      return error
    }
  };
  

  // Need to Implement other CRUD operations (e.g., listObjects, getObject, deleteObject) similarly

export default uploadFileToS3;