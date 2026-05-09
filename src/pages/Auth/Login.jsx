import React from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";
import "../../css/Auth.css";
import logo from "../../assets/visitjordan logo.png";

function Login() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={logo} alt="Visit Jordan" className="auth-logo" />
        <h2>Welcome Back!</h2>

        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button className="auth-btn" type="submit">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;