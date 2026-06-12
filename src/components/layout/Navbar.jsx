import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";

import { FaHeart, FaUserCircle } from "react-icons/fa";

import "../../css/Navbar.css";
import logo from "../../assets/visitjordan logo.png";

import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <BootstrapNavbar expand="lg" className="custom-navbar">
      <Container fluid className="navbar-container">

        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          className="navbar-logo"
        >
          <img src={logo} alt="Visit Jordan Logo" />
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="main-navbar" />

        <BootstrapNavbar.Collapse id="main-navbar">

          <Nav
            variant="underline"
            className="mx-auto navbar-links"
            defaultActiveKey="/"
          >

            {user?.role === "Admin" ? (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/admin">
                    Dashboard
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={Link} to="/admin">
                    Providers
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={Link} to="/admin">
                    Experiences
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={Link} to="/admin">
                    Content
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={Link} to="/cities">
                    Cities
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={Link} to="/experiences">
                    Experiences
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={Link} to="/blogs">
                    Blog
                  </Nav.Link>
                </Nav.Item>

                {!user && (
                  <Nav.Item>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  </Nav.Item>
                )}
              </>
            )}

          </Nav>

          <Nav className="navbar-icons">

            {user?.role === "User" && (
              <Nav.Link
                as={Link}
                to="/liked-experiences"
                title="Liked Experiences"
              >
                <FaHeart />
              </Nav.Link>
            )}

            {user && (
              <NavDropdown
                title={<FaUserCircle />}
                id="profile-dropdown"
                align="end"
                className="profile-dropdown"
              >

                {user.role === "Admin" && (
                  <NavDropdown.Item
                    as={Link}
                    to="/admin"
                  >
                    Admin Dashboard
                  </NavDropdown.Item>
                )}

                {user.role === "Provider" && (
                  <NavDropdown.Item
                    as={Link}
                    to="/provider/dashboard"
                  >
                    Provider Dashboard
                  </NavDropdown.Item>
                )}

                <NavDropdown.Item
                  as={Link}
                  to="/profile"
                >
                  Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item
                  onClick={logout}
                >
                  Logout
                </NavDropdown.Item>

              </NavDropdown>
            )}

          </Nav>

        </BootstrapNavbar.Collapse>

      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;