import { Nav, Navbar, Container } from "react-bootstrap";
import "../App.css";
import Auth from "../utils/auth";
import myTrips from "../images/Tripztracker.png";
function NavBar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  if (Auth.loggedIn()) {
    return (
      <Navbar
        expand="lg"
        className="nav justify-content-center"
        style={{ width: "100%", fontSize: "20px" }}
      >
        {" "}
        {/* Make the navbar inline */}
        <Container>
          <Navbar.Brand className="nav-text" href="/">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <img className="mx-auto navbar-center" src={myTrips} width="14%" />
            <Nav className="navbar-nav ms-auto">
              <Nav.Link className="nav-text" onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar
        expand="lg"
        className="nav justify-content-center"
        style={{ width: "100%", fontSize: "20px" }}
      >
        {" "}
        {/* Make the navbar inline */}
        <Container>
          <Navbar.Brand className="nav-text" href="/">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <img className="mx-auto navbar-center" src={myTrips} width="14%" />
            <Nav className="navbar-nav ms-auto">
              <Nav.Link className="nav-text" href="/login">
                Login
              </Nav.Link>
              <Nav.Link className="nav-text" href="/signup">
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
export default NavBar;
