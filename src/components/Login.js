import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import "./../assets/scss/login.scss";
import titleImage from "../assets/images/logos/Logoblack.svg";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { Alert } from "reactstrap";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthFailed, setAuthError] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const handleLogin = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log("Logged in");
        const user = userCredential.user;
        navigate("/starter", { replace: true });
        dispatch(loginUser({
          uid: userCredential.uid,
          username: userCredential.username,
          email: userCredential.email
        }))
      })
      .catch((error) => {
        console.log(error);
        setAuthError(true);
        setTimeout(() => {
          setAuthError(false);
        }, 2000);
      });
  };

  return (
    <div className="login">
      {isAuthFailed ? <Alert color="danger">Wrong email or password!</Alert> : ""}
      <img src={titleImage} alt="" />
      <div className="textfield-container">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
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
              <button className="login-btn" type="submit">Log in</button>
            </Form>
          )
          }

        </Formik>
      </div>
    </div>
  );
};

export default Login;
