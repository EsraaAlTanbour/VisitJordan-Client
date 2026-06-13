import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../css/Auth.css";
import logo from "../../assets/visitjordan logo.png";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

import AdminLayout from "../../components/admin/AdminLayout";
function Login() {
  const { Formik } = formik;
  const navigate = useNavigate();
  const { login } = useAuth();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleLogin = async (values) => {
    try {
      const res = await api.post("/auth/login", values);

      login(res.data.user);

      if (res.data.user.role === "Admin") {
        navigate("/admin");
      } else if (res.data.user.role === "Provider") {
        navigate("/provider");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={logo} alt="Visit Jordan" className="auth-logo" />
        <h2>Welcome Back!</h2>

        <Formik
          validationSchema={schema}
          onSubmit={handleLogin}
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
              <div className="auth-switch">
  Don't have an account?{" "}
  <Link to="/signup">Sign up</Link>
</div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;