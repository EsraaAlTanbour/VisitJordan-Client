import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as formik from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import "../../css/Auth.css";
import logo from "../../assets/visitjordan logo.png";
import api from "../../api/api";

function Signup() {
  const { Formik } = formik;
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    city: yup.string(),
    password: yup.string().min(6, "At least 6 characters").required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    isProvider: yup.boolean(),
    businessName: yup.string().when("isProvider", {
      is: true,
      then: (schema) => schema.required("Business name is required for providers"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const handleSignup = async (values) => {
    try {
      await api.post("/auth/register", {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone: values.phone,
        city: values.city,
        business_name: values.businessName,
        password: values.password,
        role: values.isProvider ? "Provider" : "User",
      });

      alert("Account created successfully");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card signup-card">
        <img src={logo} alt="Visit Jordan" className="auth-logo" />
        <h2>Create Account</h2>

        <Formik
          validationSchema={schema}
          onSubmit={handleSignup}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            city: "",
            password: "",
            confirmPassword: "",
            isProvider: false,
            businessName: "",
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
                  type="text"
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
                  type="text"
                  placeholder="City (optional)"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                />
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

              {values.isProvider && (
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Business name"
                    name="businessName"
                    value={values.businessName}
                    onChange={handleChange}
                    isInvalid={touched.businessName && !!errors.businessName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.businessName}
                  </Form.Control.Feedback>
                </Form.Group>
              )}

              <Button className="auth-btn" type="submit">
                Sign Up
              </Button>

              <div className="auth-switch">
                Already have an account? <Link to="/login">Log in</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Signup;