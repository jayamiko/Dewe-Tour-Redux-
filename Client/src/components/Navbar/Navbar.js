// Import React
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";

// Import Components
import Login from "./Login";
import Register from "./Register";
import AdminDropdown from "../Items/dropdown/AdminDropdown";
import UserDropdown from "../Items/dropdown/UserDropdown";

// Import Style
import "./Navbar.css";
import Icon from "../../img/Icon1.png";
import {Navbar, Nav} from "react-bootstrap";

const NavbarComp = ({auth: {isAuthenticated, user, isLoading}}) => {
  const currentState = useSelector((state) => state.auth);
  const isAdmin = currentState.user.status === "admin";
  const isLogin = currentState.isLogin;
  return (
    <>
      {isAuthenticated && isLogin ? (
        isAuthenticated && isAdmin ? (
          <AdminDropdown />
        ) : (
          <UserDropdown />
        )
      ) : (
        !isAuthenticated && (
          <>
            <Navbar expand="lg" style={{paddingRight: "50px"}}>
              <div style={{paddingLeft: "50px"}}></div>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{background: "white", marginTop: "20px"}}
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#login" className="nav-link">
                    <Login />
                    <Register />
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </>
        )
      )}
    </>
  );
};

NavbarComp.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(NavbarComp);
