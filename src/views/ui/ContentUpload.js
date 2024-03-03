import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Card, CardBody, CardTitle, Col, Row, Button } from "reactstrap";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import bg1 from "../../assets/images/bg/bg1.jpg";

const ContentUpload = () => {
    const location = useLocation();
    const data = location.state; // Ensure you're using this data correctly within your component.
    var [contentCount, setContentCount] = useState(1);
    const MAX_FILE_SIZE = 104857600; // Example: 100MB in bytes
    const [initalUpload,setInitUpload] = useState(true)

    const validationSchema = Yup.object().shape({
        content_name: Yup.string().required("Content name is required"),
        high_quality: Yup.array().of(
            Yup.object().shape({
                fileSize: Yup.number("").required("File size is required").positive("File size must be positive"),
                scale: Yup.number().required("Scale is required"),
                polygon_count: Yup.number().required("Polygon count is required").integer("Polygon count must be an integer").positive("Polygon count must be positive"),
                file: Yup.mixed().required("File is required")
            })
        ).required("High quality array is required"),
        mid_quality: Yup.array().of(
            Yup.object().shape({
                fileSize: Yup.number().required("File size is required").positive("File size must be positive"),
                scale: Yup.number().required("Scale is required").positive("File size must be positive"),
                polygon_count: Yup.number().required("Polygon count is required").integer("Polygon count must be an integer").positive("Polygon count must be positive"),
                file: Yup.mixed().required("File is required")
            })
        ).required("Mid quality array is required"),
        low_quality: Yup.array().of(
            Yup.object().shape({
                fileSize: Yup.number().required("File size is required").positive("File size must be positive"),
                scale: Yup.number().required("Scale is required"),
                polygon_count: Yup.number().required("Polygon count is required").integer("Polygon count must be an integer").positive("Polygon count must be positive"),
                file: Yup.mixed().required("File is required")
            })
        ).required("Low quality array is required")
    });

    function handleContentUpload(values) {
        setInitUpload(false);
        console.log(values);
    }

    const initialValues = {
        content_name: "",
        isSelected: true,
        high_quality: {
            fileSize: "", // Consider changing this to a numeric type if you're validating as a number.
            scale: "",
            polygon_count: "",
            file: ""
        },
        mid_quality:{
            fileSize: "", // Consider changing this to a numeric type if you're validating as a number.
            scale: "",
            polygon_count: "",
            file: ""
        },
        low_quality:{
            fileSize: "", // Consider changing this to a numeric type if you're validating as a number.
            scale: "",
            polygon_count: "",
            file: ""
        }
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
                            <img src={data.image} alt="Target Image" style={{width: "300px" ,height:"300px", objectFit:"cover"}}/>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                handleContentUpload(values);
                                await new Promise((r) => setTimeout(r, 500));
                                alert(JSON.stringify(values, null, 2));
                            }}
                        >
                            {(values) => (
                                <Form>
                                    <div>
                                        <div className="row">
                                            <div style={{ height: "1px", width: "100%", backgroundColor: "#c7c7c7", marginTop: "20px", marginBottom: "20px" }}></div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="content_name">Content name</label>
                                                    <Field
                                                        name="content_name"
                                                        placeholder="Enter the content name"
                                                        type="text"
                                                        className="mt-2 form-control"
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="content_name"
                                                        className="invalid-feedback"
                                                    />
                                                </div>

                                                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                                                    <h5 style={{ fontWeight: "bolder", fontSize: "16" }}>AR content with highest quality</h5>
                                                </div>

                                                <div>
                                                    <div className="form-group">
                                                        <label>Content file size</label>
                                                        <Field type="text" name="high_quality.fileSize" placeholder="Enter the size of file" className="mt-2 form-control" />
                                                        <ErrorMessage name="high_quality.fileSize" component="div" />
                                                        <label></label>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Content the polygon count</label>
                                                        <Field type="text" name="high_quality.polygon_count" placeholder="Enter the polygon count" className="mt-2 form-control" />
                                                        <ErrorMessage name="high_quality.polygon_count" component="div" />
                                                        <label></label>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Content the Scale</label>
                                                        <Field type="text" name="high_quality.scale" placeholder="Enter the Scale" className="mt-2 form-control" />
                                                        <ErrorMessage name="high_quality.scale" component="div" />
                                                        <label></label>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Upload the content with highest quality</label>
                                                        <Field type="file" name="high_quality.file" placeholder="Enter the Scale" className="mt-2 form-control" />
                                                        <ErrorMessage name="high_quality.file" component="div" />
                                                        <label></label>
                                                    </div>
                                                </div>

                                                {/* ========================== mid quality content ====================== */}
                                                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                                                    <h5 style={{ fontWeight: "bolder", fontSize: "16" }}>AR content with mid quality</h5>
                                                </div>
                                                <div>
                                                    <div className="form-group">
                                                        <label>Content file size</label>
                                                        <Field type="text" name="mid_quality.fileSize" placeholder="Enter the size of file" className="mt-2 form-control" />
                                                        <ErrorMessage name="mid_quality.fileSize" component="div" />
                                                        <label></label>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Content the polygon count</label>
                                                        <Field type="text" name="mid_quality.polygon_count" placeholder="Enter the polygon count" className="mt-2 form-control" />
                                                        <ErrorMessage name="mid_quality.polygon_count" component="div" />
                                                        <label></label>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Content the Scale</label>
                                                        <Field type="text" name="mid_quality.scale" placeholder="Enter the Scale" className="mt-2 form-control" />
                                                        <ErrorMessage name="mid_quality.scale" component="div" />
                                                        <label></label>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Upload the content with mid quality</label>
                                                        <Field type="file" name="mid_quality.file" placeholder="Enter the Scale" className="mt-2 form-control" />
                                                        <ErrorMessage name="mid_quality.file" component="div" />
                                                        <label></label>
                                                    </div>
                                                </div>

                                                {/* ========================== low quality content ====================== */}
                                                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                                                    <h5 style={{ fontWeight: "bolder", fontSize: "16" }}>AR content with lowest quality</h5>
                                                </div>
                                                <div>
                                                    <div className="form-group">
                                                        <label>Content file size</label>
                                                        <Field type="text" name="low_quality.fileSize" placeholder="Enter the size of file" className="mt-2 form-control" />
                                                        <ErrorMessage name="low_quality.fileSize" component="div" />
                                                        <label></label>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Content the polygon count</label>
                                                        <Field type="text" name="low_quality.polygon_count" placeholder="Enter the polygon count" className="mt-2 form-control" />
                                                        <ErrorMessage name="low_quality.polygon_count" component="div" />
                                                        <label></label>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Content the Scale</label>
                                                        <Field type="text" name="low_quality.scale" placeholder="Enter the Scale" className="mt-2 form-control" />
                                                        <ErrorMessage name="low_quality.scale" component="div" />
                                                        <label></label>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Upload the content with lowest quality</label>
                                                        <Field type="file" name="low_quality.file" placeholder="Enter the Scale" className="mt-2 form-control" />
                                                        <ErrorMessage name="low_quality.file" component="div" />
                                                        <label></label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div style={{display:"flex" ,width: "50%", flexDirection: "row"}}>
                                            <Button
                                                type="submit"
                                                className="btn"
                                                color="success"
                                                style={{ marginInline: "10px" }}
                                            >
                                               {initalUpload? "Confim": "Add another content"}
                                            </Button>
                                            <Button type="submit" className="btn" color="danger">Cancel</Button>
                                        </div>
                                    </div>
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
