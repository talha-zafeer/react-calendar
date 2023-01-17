import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Calendar2Check } from "react-bootstrap-icons";

const NavBar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    const result = fetch("/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.ok) {
          localStorage.removeItem("email");
          localStorage.removeItem("isAuthenticated");

          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  const email = localStorage.getItem("email");

  return (
    <Navbar variant="dark" className="nav-bar sticky-top">
      <Container>
        <Navbar.Brand to="#calendar">
          <Calendar2Check className="fs-1" />
        </Navbar.Brand>
        {email && (
          <>
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
              <Navbar.Text>Signed in as: {email}</Navbar.Text>
              <a onClick={logOut} className="btn btn-light ms-5">
                Logout
              </a>
            </Navbar.Collapse>
          </>
        )}
        {!email && (
          <>
            <Nav className="me-auto justify-content-end"></Nav>
            <Navbar.Collapse className="justify-content-end">
              <Link to="sign-up" className="btn btn-light ms-5">
                Register
              </Link>
              <Link to="/" className=" btn btn-light ms-5">
                LogIn
              </Link>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
