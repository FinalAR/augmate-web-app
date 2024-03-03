import { useLocation } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Row, Button } from "reactstrap";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import bg1 from "../../assets/images/bg/bg1.jpg";

const ContentUpload = () => {
    const location = useLocation();
    const data = location.state; // Ensure you're using this data correctly within your component.

    const MAX_FILE_SIZE = 104857600; // Example: 100MB in bytes

    const imageSchema = Yup.object().shape({
        arContents: Yup.array().of(
            Yup.object().shape({
                content_name: Yup.string().required("Content name is required"),
                fileSize: Yup.number().required("File size is required"), // Assuming fileSize should be a number. Adjust if it's supposed to be a string.
                polygon_count: Yup.number().required("Polygon count is required"),
                content: Yup.mixed().required("Please add the content"),
                // Additional validations can be added here for file type and size, e.g.:
                // .test("fileSize", "The file is too large", value => value && value.size <= MAX_FILE_SIZE)
            })
        )
    });

    function handleContentUpload(values) {
        // Implement the upload logic here.
        console.log(values);
    }

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h2" className="border-bottom p-3 mb-0">
                        {data.title}
                    </CardTitle>
                    <CardBody>
                        <div style={{ width: "100%", justifyContent: "center", display: "flex", padding: 20 }}>
                            <img src={bg1} alt="" />
                        </div>
                        <Formik
                            initialValues={{
                                arContents: [{
                                    content_name: "",
                                    picked: "",
                                    fileSize: "", // Consider changing this to a numeric type if you're validating as a number.
                                    Scale: "",
                                    isSelected: true,
                                    content: "",
                                    polygon_count: ""
                                }]
                            }}
                            validationSchema={imageSchema}
                            onSubmit={(values) => handleContentUpload(values)}>
                            {({props}) => (
                                <Form>
                                    <FieldArray name="arContents">
                                        {/* {({ insert, remove, push }) => ( */}
                                            <div>
                                                {props.arContents.length > 0 &&
                                                    props.arContents.map((content, index) => (
                                                        <div key={index}>
                                                            <div className="form-group">
                                                                <label>Content name</label>
                                                                <Field
                                                                    type="text"
                                                                    name="content_name"
                                                                    placeholder="Enter content name"
                                                                    autoComplete="off"
                                                                    className={`mt-2 form-control ${props.touched.content_name && props.errors.content_name ? "is-invalid" : ""
                                                                        }`}
                                                                />
                                                                <ErrorMessage
                                                                    component="div"
                                                                    name="content_name"
                                                                    className="invalid-feedback"
                                                                />
                                                                <label></label>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Number of quality levels</label>
                                                                <div role="group" aria-labelledby="my-radio-group" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                                    <label style={{ marginRight: "2px" }}>
                                                                        <Field type="radio" name="picked" value="1" style={{ margin: "2px" }} />
                                                                        One
                                                                    </label>
                                                                    <label>
                                                                        <Field type="radio" name="picked" value="2" style={{ margin: "2px" }} />
                                                                        Two
                                                                    </label>
                                                                    <label>
                                                                        <Field type="radio" name="picked" value="3" style={{ margin: "2px" }} />
                                                                        Three
                                                                    </label>
                                                                </div>
                                                                <ErrorMessage
                                                                    component="div"
                                                                    name="content_name"
                                                                    className="invalid-feedback"
                                                                />
                                                                <label></label>
                                                            </div>
                                                            {(props.picked == "1") ?
                                                                <div className="form-group">
                                                                    <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                                                                        <label style={{ fontWeight: "bolder" }}>Content details</label>
                                                                    </div>
                                                                    <label>Size of file </label>
                                                                    <Field
                                                                        type="text"
                                                                        name="fileSize"
                                                                        placeholder="Enter the size of content"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.fileSize && props.errors.fileSize ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="fileSize"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label>Polygon count</label>
                                                                    <Field
                                                                        type="text"
                                                                        name="polygon_count"
                                                                        placeholder="Enter the polygon count"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.polygon_count && props.errors.polygon_count ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="polygon_count"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label> Upload content file </label>
                                                                    <Field
                                                                        type="file"
                                                                        name="content"
                                                                        placeholder="Upload image target"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.content && props.errors.content ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="content"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label></label>
                                                                </div>
                                                                : ""}
                                                            {(props.picked == "2") ?
                                                                <div className="form-group">
                                                                    <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                                                                        <label style={{ fontWeight: "bolder" }}>Upload content with high quality</label>
                                                                    </div>
                                                                    <label>Size of file </label>
                                                                    <Field
                                                                        type="text"
                                                                        name="fileSize"
                                                                        placeholder="Enter the size of content"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.fileSize && props.errors.fileSize ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="fileSize"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label>Polygon count</label>
                                                                    <Field
                                                                        type="text"
                                                                        name="polygon_count"
                                                                        placeholder="Enter the polygon count"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.polygon_count && props.errors.polygon_count ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="polygon_count"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label> Upload content file </label>
                                                                    <Field
                                                                        type="file"
                                                                        name="content"
                                                                        placeholder="Upload image target"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.content && props.errors.content ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="content"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label></label>
                                                                    <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                                                                        <label style={{ fontWeight: "bolder" }}>Upload content with low quality</label>
                                                                    </div>
                                                                    <label>Size of file </label>
                                                                    <Field
                                                                        type="text"
                                                                        name="fileSize"
                                                                        placeholder="Enter the size of content"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.fileSize && props.errors.fileSize ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="fileSize"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label>Polygon count</label>
                                                                    <Field
                                                                        type="text"
                                                                        name="polygon_count"
                                                                        placeholder="Enter the polygon count"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.polygon_count && props.errors.polygon_count ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="polygon_count"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label> Upload content file </label>
                                                                    <Field
                                                                        type="file"
                                                                        name="content"
                                                                        placeholder="Upload image target"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.content && props.errors.content ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="content"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label></label>
                                                                </div>
                                                                : ""}
                                                            {(props.picked == "3") ?
                                                                <div className="form-group">
                                                                    <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                                                                        <label style={{ fontWeight: "bolder" }}>Upload content with high quality</label>
                                                                    </div>
                                                                    <label>Size of file </label>
                                                                    <Field
                                                                        type="text"
                                                                        name="fileSize"
                                                                        placeholder="Enter the size of content"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.fileSize && props.errors.fileSize ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="fileSize"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label>Polygon count</label>
                                                                    <Field
                                                                        type="text"
                                                                        name="polygon_count"
                                                                        placeholder="Enter the polygon count"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.polygon_count && props.errors.polygon_count ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="polygon_count"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label> Upload content file </label>
                                                                    <Field
                                                                        type="file"
                                                                        name="content"
                                                                        placeholder="Upload image target"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.content && props.errors.content ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="content"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label></label>
                                                                    <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                                                                        <label style={{ fontWeight: "bolder" }}>Upload content with mid quality</label>
                                                                    </div>
                                                                    <label>Size of file </label>
                                                                    <Field
                                                                        type="text"
                                                                        name="fileSize"
                                                                        placeholder="Enter the size of content"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.fileSize && props.errors.fileSize ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="fileSize"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label>Polygon count</label>
                                                                    <Field
                                                                        type="text"
                                                                        name="polygon_count"
                                                                        placeholder="Enter the polygon count"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.polygon_count && props.errors.polygon_count ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="polygon_count"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label> Upload content file </label>
                                                                    <Field
                                                                        type="file"
                                                                        name="content"
                                                                        placeholder="Upload image target"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.content && props.errors.content ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="content"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label></label>
                                                                    <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                                                                        <label style={{ fontWeight: "bolder" }}>Upload content with low quality</label>
                                                                    </div>
                                                                    <label>Size of file </label>
                                                                    <Field
                                                                        type="text"
                                                                        name="fileSize"
                                                                        placeholder="Enter the size of content"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.fileSize && props.errors.fileSize ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="fileSize"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label>Polygon count</label>
                                                                    <Field
                                                                        type="text"
                                                                        name="polygon_count"
                                                                        placeholder="Enter the polygon count"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.polygon_count && props.errors.polygon_count ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="polygon_count"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label> Upload content file </label>
                                                                    <Field
                                                                        type="file"
                                                                        name="content"
                                                                        placeholder="Upload image target"
                                                                        autoComplete="off"
                                                                        className={`mt-2 form-control ${props.touched.content && props.errors.content ? "is-invalid" : ""
                                                                            }`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="content"
                                                                        className="invalid-feedback"
                                                                    />
                                                                    <label></label>
                                                                    <Button
                                                                        type="button"
                                                                        className="secondary"
                                                                        // onClick={() => remove(index)}
                                                                        >
                                                                        Remove
                                                                    </Button>
                                                                </div>
                                                                : ""}
                                                            <Button
                                                                type="button"
                                                                className="secondary"
                                                                // onClick={() => push({
                                                                //     content_name: "",
                                                                //     picked: "",
                                                                //     fileSize: "",
                                                                //     Scale: "",
                                                                //     isSelected: true,
                                                                //     content: "",
                                                                //     polygon_count: ""
                                                                // })}>
                                                                >
                                                                Add Content
                                                            </Button>
                                                        </div>
                                                    ))}
                                            </div>
                                        {/* )} */}
                                        <Button type="submit" className="btn" color="success">Confirm</Button>
                                    </FieldArray>
                                </Form>
                            )}
                        </Formik>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default ContentUpload;
