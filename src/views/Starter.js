import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { Button, Col, Row } from "reactstrap";
import * as Yup from "yup";
import "../assets/css/imagetargetform.css";
import "../assets/css/starter.css";
import bg1 from "../assets/images/bg/bg1.jpg";
import "../assets/scss/_variables.scss";
import Blog from "../components/dashboard/Blog";
import { Display } from "react-bootstrap-icons";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";
import getApiUrl from "../utility/apiUtils";
import UploadComponent from "../components/contentUploader";

const BlogData = [];
const ImageTargetForm = (props) => {
  const MAX_FILE_SIZE = 10240000; //100MB
  const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };
  function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
  }
  const imageSchema = Yup.object().shape({
    imageName: Yup.string().required("Image target name is required"),
    targetImage: Yup
      .mixed()
      .required("Target image file is required"),
    imageTargetSrc: Yup
      .mixed()
      .required("compiled .mind file is required"),
    // targetImage: Yup
    //   .mixed()
    //   .required("Required"),
    // imageTargetSrc: Yup
    //   .mixed()
    //   .required("Required"),
    // .test("is-valid-type", "Not a valid image type",
    //   value => isValidFileType(value, "image"))
    // .test("is-valid-size", "Max allowed size is 100MB",
    //   value => value && value.size <= MAX_FILE_SIZE)
  });
  function handleToggle(e) {
    e.preventDefault()
    props.toggle()
  }
  const [imageUrl, setImageUrl] = useState("");
  // const [compileFileUrl, setCompileFileUrl] = useState("");
  const [targetHashValue, setHashValue] = useState("");
  const [isValidPHash, setPhashValidation] = useState(true);

  //Firebase upload
  const [progress, setProgress] = useState(0);

  const handleImage = async (file) => {
    setProgress(0)
    if (file == null) {
      return;
    } else {
      const currentDate = new Date();
      const imageRef = storageRef(storage, `targets/${currentDate.getTime()}_${file.name}`);
      const hash = await window.pHash.hash(file);
      const { data: response } = await axios.get(getApiUrl(`content/find/${hash.value}`));
      console.log(response);
      if(response.data.successOrFaliure == "N"){
        setPhashValidation(true)
        console.log(hash.value)
        setHashValue(hash.value);
        await uploadBytes(imageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setProgress(100);
              console.log(url);
              setImageUrl(url);
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
          // toastifyError(error.message);
        });
      }else{
        setPhashValidation(false)
      }
    }
  }

  //File upload
  // const handleFileUpload = (fileUrl) => {
  //   setCompileFileUrl(fileUrl);
  // };

  const handleSubmit = (e) => {
    if(isValidPHash){
      axios.post(getApiUrl('content/create'), {
        targetpHash: targetHashValue,
        targetImage: imageUrl,
        contentImage: "",
        contentPath: "",
        description: e.imageName,
        analysis: {},
        contents: {},
        positionY: "",
        scaleSet: "",
        size: "",
        ref_ver: 1,
        imageTargetSrc: e.imageTargetSrc
      })
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
  
      props.toggle()
    }
  }

  const pushTargetData = (targetData) => {
    BlogData.push({ targetData });
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <div></div>
        <i className="bi bi-x-circle-fill" style={{ color: "#e51515", float: "right", fontWeight: "800" }} onClick={handleToggle}></i>
        <h2>Add image target</h2>
        <Formik
          initialValues={{
            imageName: "",
            targetImage: "",
            imageTargetSrc: ""
          }}
          validationSchema={imageSchema}
          onSubmit={handleSubmit}>
          {
            (props) => (
              <Form>
                <div className="form-group">
                  <label>Image name</label>
                  <Field
                    type="text"
                    name="imageName"
                    placeholder="Enter image name"
                    className={`mt-2 form-control ${props.touched.imageName && props.errors.imageName ? "is-invalid" : ""
                      }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="imageName"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label>Upload compiled .mind file</label>
                  <UploadComponent validationProps={props} fieldName="imageTargetSrc" />
                </div>
                <div className="form-group">
                  <label>Image target</label>
                  <input
                    type="file"
                    name="targetImage"
                    placeholder="Upload image target"
                    onChange={async (e) => {
                      await handleImage(e.target.files[0]);
                      props.setFieldValue("targetImage", e.target.files[0]);
                    }}
                    className={`mt-2 form-control ${props.touched.targetImage && props.errors.targetImage ? "is-invalid" : ""}`}
                  />
                  <progress value={progress} max={100} />
                  <span>{progress}%</span>
                  <ErrorMessage
                    component="div"
                    name="targetImage"
                    className="invalid-feedback"
                  />
                </div>
                <div></div>
                {!isValidPHash ? <span style={{color: "red"}}>This image target already uploaded!</span> : ""}
                <div></div>
                <Button type="submit" className="btn" color="success" >Confirm</Button>
                {/* {imageUrl && isLoading ?
                  <Button type="submit" className="btn" color="success" >Confirm</Button>
                  :
                  <Button type="submit" className="btn" color="success" disabled >Confirm</Button>
                } */}
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  )
};

const Starter = () => {
  const [seen, setSeen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(getApiUrl('content/fetch'));
        console.log(response);
        BlogData.length = 0;
        response.data.forEach(element => {
          BlogData.push({ element });
        });
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  function togglePop() {
    setSeen(!seen);
  }
  return (
    <div>
      <div className="button-container"><Button color="primary" onClick={togglePop}>Add image target</Button></div>
      {seen ? <ImageTargetForm toggle={togglePop} /> : null}
      <Row>
        {BlogData.reduce((acc, blg) => {
          // Check if the targetImage is already in acc array
          if (!acc.some(item => item.element.targetImage === blg.element.targetImage)) {
            acc.push(blg);
          }
          return acc;
        }, []).map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.element.targetImage}
              title={blg.element.description}
              compileFileUrl={blg.element.imageTargetSrc}
              targetpHash={blg.element.targetpHash}
              contents={BlogData.filter(item => item.element.targetImage === blg.element.targetImage)}
              docID={blg.element._id}
              color="primary"
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
