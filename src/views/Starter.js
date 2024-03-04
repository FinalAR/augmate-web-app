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

const BlogData = [];
const ImageTargetForm = (props) => {
  const MAX_FILE_SIZE = 10240000; //100MB
  const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };
  function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
  }
  const imageSchema = Yup.object().shape({
    imageName: Yup.string().required("Image target name is required"),
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
  const [isLoading, setIsLoading] = useState(false);
  const [targetImage, setTargetImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [compileTarget, setCompileTarget] = useState(null);
  const [compileFileUrl, setCompileFileUrl] = useState("");
  const [targetHashValue,setHashValue] = useState("");

  function handleImage() {
    const currentDate = new Date();
    if (targetImage == null) {
      return;
    } else {
      const imageRef = storageRef(storage, `targets/${currentDate.getTime()}_${targetImage.name}`);

      try {
        const hash = window.pHash.hash(targetImage);
        setHashValue(hash.value);
      } catch (error) {
        console.error('Error generating hash:', error);
      }

      uploadBytes(imageRef, targetImage)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              console.log(url);
              setIsLoading(false);
              setImageUrl(url);
              // pushTargetData({
              //   targetId: BlogData.length++,
              //   imageName: e.imageName,
              //   targetImage: url,
              //   btnbg: "primary",
              // });
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
          // toastifyError(error.message);
        });
    }
  }

  const handleSubmit = (e) => {
    axios.post(getApiUrl('/content/create'), {
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
      imageTargetSrc: imageUrl
    })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });

    props.toggle()
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
            imageName: ""
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
                  <input
                    type="file"
                    name="imageTargetSrc"
                    placeholder="Enter description"
                    onChange={(e) => {
                      setCompileTarget(e.target.files[0]);
                    }}
                    className={`mt-2 form-control`}
                  />
                  <ErrorMessage
                    component="div"
                    name="imageTargetSrc"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label>Image target</label>
                  <input
                    type="file"
                    name="targetImage"
                    placeholder="Upload image target"
                    onChange={(e) => {
                      setIsLoading(true);
                      setTargetImage(e.target.files[0]);
                      handleImage();
                    }}
                    className={`mt-2 form-control`}
                  />
                </div>
                {targetImage && compileTarget ?
                  <Button type="submit" className="btn" color="success" >Confirm</Button>
                  :
                  <Button type="submit" className="btn" color="success" disabled >Confirm</Button>
                }

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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(getApiUrl('content/fetch'));
        console.log(response);
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
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              imageId={blg.element.targetpHash}
              image={blg.element.targetImage}
              title={blg.element.description}
              color="primary"
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
