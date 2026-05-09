import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as formik from "formik";
import * as yup from "yup";
import "../../css/Auth.css";
import logo from "../../assets/visitjordan logo.png";

function Signup() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    username: yup.string().required("Username is required"),
    phone: yup.string().required("Phone number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "At least 6 characters").required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    isProvider: yup.boolean(),
  });

  return (
    <div>
      <div className="auth-page">
      <div className="auth-card signup-card">
        <img src={logo} alt="Visit Jordan" className="auth-logo" />
        <h2>Create Account</h2>

        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            isProvider: false,
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Form.Group as={Col} md="6" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    isInvalid={touched.firstName && !!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    isInvalid={touched.lastName && !!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={touched.username && !!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="tel"
                  placeholder="Phone number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  isInvalid={touched.phone && !!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

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

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="isProvider"
                  label="I want to sign up as an experience provider"
                  checked={values.isProvider}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button className="auth-btn" type="submit">
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>
    
  );
}

export default Signup;