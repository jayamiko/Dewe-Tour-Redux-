// Import React
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

// Import Components
import Login from "./Login";
import Register from "./Register";
import AdminDropdown from "../Items/dropdown/AdminDropdown";
import UserDropdown from "../Items/dropdown/UserDropdown";

// Import Style
import "./Navbar.css";
import Icon from "../../img/Icon1.png";
import {Navbar, Nav} from "react-bootstrap";

function NavbarComp() {
  const currentState = useSelector((state) => state.auth);
  const isAdmin = currentState.user.status === "admin";
  const isLoginSession = useSelector((state) => state.isLogin === true);
  return (
    <>
      {currentState.isLogin ? (
        isAdmin ? (
          <AdminDropdown />
        ) : (
          <UserDropdown />
        )
      ) : (
        <>
          <Navbar expand="lg" style={{paddingRight: "50px"}}>
            <div style={{paddingLeft: "50px"}}>
              <Link to="/">
                <img src={Icon} alt="icon" className="icon-dewetour" />
              </Link>
            </div>

            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{background: "white"}}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#login">
                  <Login />
                  <Register />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      )}
    </>
  );
}

export default NavbarComp;
