import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand to="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="calendar" className="nav-link">
            View Calendar
          </Link>
          <Link to="create-event" className="nav-link">
            Create Event
          </Link>
          <Link to="create-all-day" className="nav-link">
            Create All-Day Event
          </Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{}</a>
          </Navbar.Text>
          <a
            href="http://localhost:8000/logout"
            className="btn btn-secondary ms-5"
          >
            Logout
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
