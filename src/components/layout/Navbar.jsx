import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";

import { FaHeart, FaUserCircle } from "react-icons/fa";

import "../../css/Navbar.css";
import logo from "../../assets/visitjordan logo.png";

function Navbar() {
  return (
    <BootstrapNavbar expand="lg" className="custom-navbar">
      <Container fluid className="navbar-container">

        {/* Logo */}
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          className="navbar-logo"
        >
          <img src={logo} alt="Visit Jordan Logo" />
        </BootstrapNavbar.Brand>

        {/* Mobile Toggle */}
        <BootstrapNavbar.Toggle aria-controls="main-navbar" />

        <BootstrapNavbar.Collapse id="main-navbar">

          {/* Center Links */}
          <Nav
            variant="underline"
            className="mx-auto navbar-links"
            defaultActiveKey="/"
          >
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

            <Nav.Item>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Right Icons */}
          <Nav className="navbar-icons">

            <Nav.Link
              as={Link}
              to="/liked-experiences"
              title="Liked Experiences"
            >
              <FaHeart />
            </Nav.Link>

            <NavDropdown
              title={<FaUserCircle />}
              id="profile-dropdown"
              align="end"
              className="profile-dropdown"
            >
              <NavDropdown.Item
                as={Link}
                to="/profile"
              >
                Profile
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                as={Link}
                to="/"
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>

        </BootstrapNavbar.Collapse>

      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;