import React, { useState } from "react";
import "../assets/scss/signup.scss";
import titleImage from "../assets/images/logos/Logoblack.svg";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Alert } from "reactstrap";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error,setError] = useState("");
  const [isAuthFailed, setAuthError] = useState(false);

  const signupSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });


  const handleSignUp = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((authUser) => {
        signInWithEmailAndPassword(auth, values.email, values.password).then(
          updateProfile(auth.currentUser, {
            displayName: values.username,
          }),
          dispatch(
            loginUser({
              uid: authUser.uid,
              username: authUser.displayName,
              email: authUser.email,
            })
          )
        );
        navigate("/starter", { replace: true });
      })
      .catch((err) => {
       alert(err);
        setError(error);
        setAuthError(true);
        setTimeout(() => {
          setAuthError(false);
        }, 2000);
      });
  };
  return (
    <div className="signup">
       {isAuthFailed ? <Alert color="danger">{error}</Alert> : ""}
       <img
        src={titleImage}
        alt=""
      />
      <div className="signup-textfield-container">
      <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
          }}
          validationSchema={signupSchema}
          onSubmit={handleSignUp}
        >
          {(props) =>
          (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  className={`mt-2 form-control ${props.touched.email && props.errors.email ? "is-invalid" : ""
                    }`}
                />
                <ErrorMessage
                  component="div"
                  name="email"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="username" className="mt-3">
                  Username
                </label>
                <Field
                  type="username"
                  name="username"
                  placeholder="Enter username"
                  className={`form-control ${props.touched.username && props.errors.username
                    ? "is-invalid"
                    : ""
                    }`}
                />
                <ErrorMessage
                  component="div"
                  name="username"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="mt-3">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className={`form-control ${props.touched.password && props.errors.password
                    ? "is-invalid"
                    : ""
                    }`}
                />
                <ErrorMessage
                  component="div"
                  name="password"
                  className="invalid-feedback"
                />
              </div>
              <button className={"signup-btn"} type="submit">Sign up</button>
            </Form>
          )
          }
        </Formik>
      </div>
    </div>
  );
}

export default Signup;
